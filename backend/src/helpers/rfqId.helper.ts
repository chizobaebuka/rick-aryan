import { AppDataSource } from '../config/database';
import { RFQ } from '../entities/RFQ';

export const generateRFQCode = async (): Promise<string> => {
  const repo = AppDataSource.getRepository(RFQ);
  const count = await repo.count();
  return `RFQ-${String(8000 + count + 1).padStart(4, '0')}`;
};
