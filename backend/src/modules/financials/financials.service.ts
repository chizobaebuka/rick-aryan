import { FinancialsRepository } from './financials.repository';
import { CreateInvoiceDto } from '../../interfaces/IFinancials';
import { AppDataSource } from '../../config/database';
import { RFQ, RFQStatus } from '../../entities/RFQ';
import { Vehicle, VehicleStatus } from '../../entities/Vehicle';
import { In } from 'typeorm';
import { STOCK_VALUE_PER_MT_NGN } from '../../utils/constants';

export class FinancialsService {
  private repo = new FinancialsRepository();

  async listInvoices(page: number, limit: number) {
    const [data, total] = await this.repo.findAll(page, limit);
    return { data, total, page, limit };
  }

  async createInvoice(data: CreateInvoiceDto) {
    return this.repo.save({
      invoiceNumber: data.invoiceNumber,
      clientName: data.clientName,
      amountNGN: String(data.amountNGN),
      status: data.status,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    });
  }

  async summary() {
    const rfqRepo = AppDataSource.getRepository(RFQ);
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const activeRFQs = await rfqRepo.count({
      where: { status: In([RFQStatus.NEW, RFQStatus.IN_REVIEW]) },
    });
    const totalTrucks = await vehicleRepo.count();
    const deployed = await vehicleRepo.count({ where: { status: VehicleStatus.IN_TRANSIT } });
    const totalMT = await this.repo.getTotalStockMT();
    const totalStockValueNGN = Math.round(totalMT * STOCK_VALUE_PER_MT_NGN);
    const pendingInvoices = await this.repo.countPending();
    const fleetUtilizationPercent =
      totalTrucks === 0 ? 0 : Math.round((deployed / totalTrucks) * 100);

    return {
      totalStockValueNGN,
      activeRFQs,
      activeRFQsUnreadHint: Math.min(activeRFQs, 5),
      trucksDeployed: deployed,
      totalTrucks,
      fleetUtilizationPercent,
      pendingInvoices,
    };
  }
}
