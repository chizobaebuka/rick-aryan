import { AppDataSource } from '../../config/database';
import { Invoice, InvoiceStatus } from '../../entities/Invoice';
import { StockEntry } from '../../entities/StockEntry';
import { Repository, In } from 'typeorm';

export class FinancialsRepository {
  private repo: Repository<Invoice>;

  constructor() {
    this.repo = AppDataSource.getRepository(Invoice);
  }

  async findAll(page: number, limit: number): Promise<[Invoice[], number]> {
    return this.repo
      .createQueryBuilder('i')
      .orderBy('i.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  async save(inv: Partial<Invoice>): Promise<Invoice> {
    return this.repo.save(inv);
  }

  async countPending(): Promise<number> {
    return this.repo.count({
      where: { status: In([InvoiceStatus.SENT, InvoiceStatus.OVERDUE]) },
    });
  }

  async getTotalStockMT(): Promise<number> {
    const stockRepo = AppDataSource.getRepository(StockEntry);
    const raw = await stockRepo
      .createQueryBuilder('s')
      .select('COALESCE(SUM(CAST(s.stockLevelMT AS DECIMAL)), 0)', 't')
      .getRawOne();
    return Number(raw?.t ?? 0);
  }
}
