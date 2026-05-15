import { RFQRepository } from './rfq.repository';
import { IRFQService, CreateRFQDto, RFQQueryDto } from '../../interfaces/IRFQ';
import { generateRFQCode } from '../../helpers/rfqId.helper';
import { AppError } from '../../utils/AppError';
import { RFQ, RFQPriority, RFQStatus } from '../../entities/RFQ';
import { sendRfqNotificationEmail } from '../../utils/mailer';
import { logger } from '../../utils/logger';

export class RFQService implements IRFQService {
  private repo = new RFQRepository();

  async createRFQ(data: CreateRFQDto): Promise<RFQ> {
    const rfqCode = await generateRFQCode();
    const priority = data.priority ?? RFQPriority.NORMAL;
    const feed = [
      {
        message: 'RFQ Created',
        actor: 'Public Portal',
        timestamp: new Date().toISOString(),
      },
    ];
    const saved = await this.repo.save({
      ...data,
      rfqCode,
      status: RFQStatus.NEW,
      priority,
      quantityMT: String(data.quantityMT),
      deliveryLeadTime: data.deliveryLeadTime ?? null,
      notes: data.notes ?? null,
      activityFeed: feed,
    });

    void sendRfqNotificationEmail({
      rfqCode: saved.rfqCode,
      companyName: saved.companyName,
      contactEmail: saved.contactEmail,
      location: saved.location,
      productRequested: saved.productRequested,
      quantityMT: saved.quantityMT,
      notes: saved.notes,
    }).catch((err) => {
      logger.error('RFQ notification email failed:', err);
    });

    return saved;
  }

  async getAllRFQs(query: RFQQueryDto) {
    const [data, total] = await this.repo.findAll(query.page, query.limit, query.status);
    return { data, total, page: query.page, limit: query.limit };
  }

  async getRFQById(id: string): Promise<RFQ> {
    const rfq = await this.repo.findById(id);
    if (!rfq) throw new AppError('RFQ not found', 404);
    return rfq;
  }

  async updateRFQStatus(id: string, status: RFQStatus): Promise<RFQ> {
    const rfq = await this.getRFQById(id);
    rfq.status = status;
    return this.repo.save(rfq);
  }

  async addActivityNote(id: string, message: string, actor: string): Promise<RFQ> {
    const rfq = await this.getRFQById(id);
    const next = [
      ...rfq.activityFeed,
      { message, actor, timestamp: new Date().toISOString() },
    ];
    rfq.activityFeed = next;
    return this.repo.save(rfq);
  }

  async deleteRFQ(id: string): Promise<void> {
    await this.getRFQById(id);
    await this.repo.delete(id);
  }
}
