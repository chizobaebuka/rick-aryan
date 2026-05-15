import { Invoice, InvoiceStatus } from '../entities/Invoice';

export interface CreateInvoiceDto {
  invoiceNumber: string;
  clientName: string;
  amountNGN: number;
  status?: InvoiceStatus;
  dueDate?: string;
}

export interface DashboardSummary {
  totalStockValueNGN: number;
  activeRFQs: number;
  activeRFQsUnreadHint: number;
  trucksDeployed: number;
  totalTrucks: number;
  fleetUtilizationPercent: number;
  pendingInvoices: number;
}
