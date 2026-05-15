import { AppDataSource } from '../../config/database';
import { Dispatch } from '../../entities/Dispatch';
import { Repository } from 'typeorm';

export class DispatchRepository {
  private repo: Repository<Dispatch>;

  constructor() {
    this.repo = AppDataSource.getRepository(Dispatch);
  }

  async findAll(): Promise<Dispatch[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Dispatch | null> {
    return this.repo.findOne({ where: { id } });
  }

  async save(d: Partial<Dispatch>): Promise<Dispatch> {
    return this.repo.save(d);
  }
}
