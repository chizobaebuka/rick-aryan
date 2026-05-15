import { DataSource } from 'typeorm';
import { User } from './src/entities/User';
import { Chemical } from './src/entities/Chemical';
import { StockEntry } from './src/entities/StockEntry';
import { RFQ } from './src/entities/RFQ';
import { Driver } from './src/entities/Driver';
import { Vehicle } from './src/entities/Vehicle';
import { Dispatch } from './src/entities/Dispatch';
import { Invoice } from './src/entities/Invoice';
import { AuditLog } from './src/entities/AuditLog';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  entities: [User, Chemical, StockEntry, RFQ, Driver, Vehicle, Dispatch, Invoice, AuditLog],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
