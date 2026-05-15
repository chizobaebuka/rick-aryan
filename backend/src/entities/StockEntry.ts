import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chemical } from './Chemical';

@Entity('stock_entries')
export class StockEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Chemical, { eager: true })
  @JoinColumn({ name: 'chemicalId' })
  chemical!: Chemical;

  @Column()
  chemicalId!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  stockLevelMT!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  reorderLevelMT!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  capacityMT!: string | null;

  @Column()
  batchNumber!: string;

  @Column({ type: 'date', nullable: true })
  expiryDate!: Date | null;

  @Column({ type: 'varchar', length: 256, nullable: true })
  storageLocation!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
