import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chemicals')
export class Chemical {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  casNumber!: string;

  @Column()
  formula!: string;

  @Column()
  category!: string;

  @Column()
  grade!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  tdsFileUrl!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', length: 128, nullable: true })
  viscosity!: string | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  purity!: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  freezingPoint!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
