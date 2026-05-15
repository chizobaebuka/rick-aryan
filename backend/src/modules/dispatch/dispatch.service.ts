import { DispatchRepository } from './dispatch.repository';
import { AppDataSource } from '../../config/database';
import { User } from '../../entities/User';
import { Vehicle } from '../../entities/Vehicle';
import { DispatchStatus } from '../../entities/Dispatch';
import { generateDispatchCode } from '../../helpers/dispatchId.helper';
import { getRouteFromValhalla } from '../../helpers/valhalla.helper';
import { AppError } from '../../utils/AppError';
import { CreateDispatchDto } from '../../interfaces/IDispatch';

export class DispatchService {
  private repo = new DispatchRepository();

  async list() {
    return this.repo.findAll();
  }

  async create(data: CreateDispatchDto) {
    const userRepo = AppDataSource.getRepository(User);
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const driver = await userRepo.findOne({ where: { id: data.driverId } });
    if (!driver) throw new AppError('Driver not found', 404);
    const vehicle = await vehicleRepo.findOne({ where: { id: data.vehicleId } });
    if (!vehicle) throw new AppError('Vehicle not found', 404);
    const dispatchCode = await generateDispatchCode();
    return this.repo.save({
      dispatchCode,
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      driverName: data.driverName,
      loadDescription: data.loadDescription,
      destinationName: data.destinationName,
      destinationLat: String(data.destinationLat),
      destinationLng: String(data.destinationLng),
      status: DispatchStatus.LOADING,
      progressPercent: 0,
    });
  }

  async updateStatus(id: string, status: DispatchStatus, progressPercent?: number) {
    const dispatch = await this.repo.findById(id);
    if (!dispatch) throw new AppError('Dispatch not found', 404);
    dispatch.status = status;
    if (progressPercent != null) dispatch.progressPercent = progressPercent;
    return this.repo.save(dispatch);
  }

  async getETA(dispatchId: string) {
    const dispatch = await this.repo.findById(dispatchId);
    if (!dispatch) throw new AppError('Dispatch not found', 404);
    const vehicle = dispatch.vehicle;
    if (!vehicle?.currentLatitude || !vehicle?.currentLongitude) {
      throw new AppError('No GPS data for vehicle', 400);
    }
    const origin = {
      lat: parseFloat(vehicle.currentLatitude),
      lon: parseFloat(vehicle.currentLongitude),
    };
    const destination = {
      lat: parseFloat(dispatch.destinationLat),
      lon: parseFloat(dispatch.destinationLng),
    };
    try {
      const route = await getRouteFromValhalla(origin, destination);
      await this.repo.save({
        ...dispatch,
        distanceKm: String(route.distanceKm),
        estimatedArrival: new Date(route.etaISO),
      });
      return route;
    } catch {
      throw new AppError('Unable to compute route (Valhalla unavailable)', 502);
    }
  }
}
