import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Vehicle } from './Vehicle';
import { User } from './User';

export enum DispatchStatus {
  LOADING = 'loading',
  IN_TRANSIT = 'in_transit',
  DELAYED = 'delayed',
  DELIVERED = 'delivered',
}

@Entity('dispatches')
export class Dispatch {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  dispatchCode!: string;

  @ManyToOne(() => Vehicle, { eager: true })
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @Column()
  vehicleId!: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'driverId' })
  driver!: User;

  @Column()
  driverId!: string;

  @Column()
  driverName!: string;

  @Column()
  loadDescription!: string;

  @Column()
  destinationName!: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  destinationLat!: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  destinationLng!: string;

  @Column({ type: 'enum', enum: DispatchStatus, default: DispatchStatus.LOADING })
  status!: DispatchStatus;

  @Column({ type: 'timestamptz', nullable: true })
  estimatedArrival!: Date | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distanceKm!: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  fuelConsumptionL!: string | null;

  @Column({ type: 'int', default: 0 })
  progressPercent!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
