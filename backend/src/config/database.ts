import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Chemical } from '../entities/Chemical';
import { StockEntry } from '../entities/StockEntry';
import { RFQ } from '../entities/RFQ';
import { Driver } from '../entities/Driver';
import { Vehicle } from '../entities/Vehicle';
import { Dispatch } from '../entities/Dispatch';
import { Invoice } from '../entities/Invoice';
import { AuditLog } from '../entities/AuditLog';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  entities: [User, Chemical, StockEntry, RFQ, Driver, Vehicle, Dispatch, Invoice, AuditLog],
  migrations: ['dist/migrations/*.js'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
});
