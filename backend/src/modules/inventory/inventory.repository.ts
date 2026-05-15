import { AppDataSource } from '../../config/database';
import { StockEntry } from '../../entities/StockEntry';
import { Repository } from 'typeorm';

export class InventoryRepository {
  private repo: Repository<StockEntry>;

  constructor() {
    this.repo = AppDataSource.getRepository(StockEntry);
  }

  async findAll(page: number, limit: number): Promise<[StockEntry[], number]> {
    return this.repo
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.chemical', 'c')
      .orderBy('s.updatedAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  async findById(id: string): Promise<StockEntry | null> {
    return this.repo.findOne({ where: { id }, relations: ['chemical'] });
  }

  async save(entry: Partial<StockEntry>): Promise<StockEntry> {
    return this.repo.save(entry);
  }

  async findLowStock(): Promise<StockEntry[]> {
    const entries = await this.repo.find({ relations: ['chemical'] });
    return entries.filter((e) => parseFloat(e.stockLevelMT) < parseFloat(e.reorderLevelMT));
  }
}
