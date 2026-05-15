import { AppDataSource } from '../../config/database';
import { Vehicle } from '../../entities/Vehicle';
import { Repository } from 'typeorm';

export class FleetRepository {
  private repo: Repository<Vehicle>;

  constructor() {
    this.repo = AppDataSource.getRepository(Vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.repo.find({ order: { vehicleCode: 'ASC' } });
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.repo.findOne({ where: { id } });
  }

  async save(v: Partial<Vehicle>): Promise<Vehicle> {
    return this.repo.save(v);
  }
}
