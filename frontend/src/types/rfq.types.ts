export type RFQStatus = 'new' | 'in_review' | 'quoted' | 'closed' | 'rejected';
export type RFQPriority = 'normal' | 'urgent' | 'asap';

export interface RFQ {
  id: string;
  rfqCode: string;
  companyName: string;
  contactEmail: string;
  location: string;
  productRequested: string;
  quantityMT: string;
  deliveryLeadTime?: string | null;
  status: RFQStatus;
  priority: RFQPriority;
  notes?: string | null;
  activityFeed: { message: string; actor: string; timestamp: string }[];
  createdAt: string;
}
