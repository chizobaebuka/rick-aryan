import { Response } from 'express';
import { UserService } from './users.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';
import { AuthRequest } from '../../middlewares/authenticate';

export class UsersController {
  private service = new UserService();

  list = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const users = await this.service.listUsers();
    sendSuccess(res, users);
  });

  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await this.service.createUser(req.body);
    sendSuccess(res, user, 'User created', 201);
  });

  update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await this.service.updateUser(String(req.params.id), req.body);
    sendSuccess(res, user, 'User updated');
  });

  deactivate = asyncHandler(async (req: AuthRequest, res: Response) => {
    await this.service.deactivateUser(String(req.params.id));
    sendSuccess(res, null, 'User deactivated', 204);
  });
}
