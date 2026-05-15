import { AppDataSource } from '../../config/database';
import { RFQ, RFQStatus } from '../../entities/RFQ';
import { Repository } from 'typeorm';

export class RFQRepository {
  private repo: Repository<RFQ>;

  constructor() {
    this.repo = AppDataSource.getRepository(RFQ);
  }

  async findAll(page = 1, limit = 20, status?: RFQStatus): Promise<[RFQ[], number]> {
    const query = this.repo.createQueryBuilder('rfq').orderBy('rfq.createdAt', 'DESC');
    if (status) query.andWhere('rfq.status = :status', { status });
    return query.skip((page - 1) * limit).take(limit).getManyAndCount();
  }

  async findById(id: string): Promise<RFQ | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByCode(rfqCode: string): Promise<RFQ | null> {
    return this.repo.findOne({ where: { rfqCode } });
  }

  async save(rfq: Partial<RFQ>): Promise<RFQ> {
    return this.repo.save(rfq);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
