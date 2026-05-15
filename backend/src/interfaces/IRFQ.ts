import { RFQ, RFQPriority, RFQStatus } from '../entities/RFQ';
import { PaginatedResult } from './IApiResponse';

export interface CreateRFQDto {
  companyName: string;
  contactEmail: string;
  location: string;
  productRequested: string;
  quantityMT: number;
  deliveryLeadTime?: string;
  notes?: string;
  priority?: RFQPriority;
}

export interface RFQQueryDto {
  page: number;
  limit: number;
  status?: RFQStatus;
}

export interface IRFQService {
  createRFQ(data: CreateRFQDto): Promise<RFQ>;
  getAllRFQs(query: RFQQueryDto): Promise<PaginatedResult<RFQ>>;
  getRFQById(id: string): Promise<RFQ>;
  updateRFQStatus(id: string, status: RFQStatus): Promise<RFQ>;
  addActivityNote(id: string, message: string, actor: string): Promise<RFQ>;
  deleteRFQ(id: string): Promise<void>;
}
