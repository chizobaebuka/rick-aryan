import { DispatchStatus } from '../entities/Dispatch';

export interface CreateDispatchDto {
  vehicleId: string;
  driverId: string;
  driverName: string;
  loadDescription: string;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
}

export interface UpdateDispatchStatusDto {
  status: DispatchStatus;
  progressPercent?: number;
}
