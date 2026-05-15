import { AppDataSource } from '../config/database';
import { Dispatch } from '../entities/Dispatch';

export const generateDispatchCode = async (): Promise<string> => {
  const repo = AppDataSource.getRepository(Dispatch);
  const count = await repo.count();
  return `RA-${String(99000 + count + 1)}`;
};
