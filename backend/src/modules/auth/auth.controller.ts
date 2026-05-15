import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../utils/AppError';

export class AuthController {
  private service = new AuthService();

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    sendSuccess(res, result, 'Login successful');
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, fullName } = req.body;
    const user = await this.service.register(email, password, fullName);
    sendSuccess(res, { user }, 'Account created', 201);
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Unauthorized — no token', 401);
    }
    const token = authHeader.split(' ')[1];
    const result = await this.service.refresh(token);
    sendSuccess(res, result, 'Token refreshed');
  });
}
