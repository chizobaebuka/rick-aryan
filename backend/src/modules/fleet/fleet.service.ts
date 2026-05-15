import { FleetRepository } from './fleet.repository';
import { AppError } from '../../utils/AppError';
import { VehicleStatus } from '../../entities/Vehicle';

export class FleetService {
  private repo = new FleetRepository();

  async listVehicles() {
    return this.repo.findAll();
  }

  async getVehicle(id: string) {
    const v = await this.repo.findById(id);
    if (!v) throw new AppError('Vehicle not found', 404);
    return v;
  }

  async updateLocation(id: string, latitude: string, longitude: string) {
    const v = await this.repo.findById(id);
    if (!v) throw new AppError('Vehicle not found', 404);
    v.currentLatitude = latitude;
    v.currentLongitude = longitude;
    v.lastGpsPing = new Date();
    if (v.status === VehicleStatus.AVAILABLE) v.status = VehicleStatus.IN_TRANSIT;
    return this.repo.save(v);
  }
}
