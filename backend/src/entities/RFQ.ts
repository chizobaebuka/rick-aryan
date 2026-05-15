import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RFQStatus {
  NEW = 'new',
  IN_REVIEW = 'in_review',
  QUOTED = 'quoted',
  CLOSED = 'closed',
  REJECTED = 'rejected',
}

export enum RFQPriority {
  NORMAL = 'normal',
  URGENT = 'urgent',
  ASAP = 'asap',
}

export type RFQActivityItem = { message: string; actor: string; timestamp: string };

@Entity('rfqs')
export class RFQ {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  rfqCode!: string;

  @Column()
  companyName!: string;

  @Column()
  contactEmail!: string;

  @Column()
  location!: string;

  @Column()
  productRequested!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityMT!: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  deliveryLeadTime!: string | null;

  @Column({ type: 'enum', enum: RFQStatus, default: RFQStatus.NEW })
  status!: RFQStatus;

  @Column({ type: 'enum', enum: RFQPriority, default: RFQPriority.NORMAL })
  priority!: RFQPriority;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  quotePdfUrl!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ type: 'jsonb', default: [] })
  activityFeed!: RFQActivityItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
