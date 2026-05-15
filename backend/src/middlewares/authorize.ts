import { Response, NextFunction } from 'express';
import { AuthRequest } from './authenticate';
import { AppError } from '../utils/AppError';

export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Forbidden — insufficient permissions', 403));
    }
    next();
  };
