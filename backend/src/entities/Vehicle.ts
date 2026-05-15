import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum VehicleStatus {
  AVAILABLE = 'available',
  IN_TRANSIT = 'in_transit',
  MAINTENANCE = 'maintenance',
  LOADED = 'loaded',
}

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  vehicleCode!: string;

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column({ type: 'enum', enum: VehicleStatus, default: VehicleStatus.AVAILABLE })
  status!: VehicleStatus;

  @Column({ type: 'varchar', length: 32, nullable: true })
  currentLatitude!: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  currentLongitude!: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  lastGpsPing!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;
}
