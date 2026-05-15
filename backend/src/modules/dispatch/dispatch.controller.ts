import { Response } from 'express';
import { DispatchService } from './dispatch.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';
import { AuthRequest } from '../../middlewares/authenticate';
import { DispatchStatus } from '../../entities/Dispatch';

export class DispatchController {
  private service = new DispatchService();

  list = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await this.service.list();
    sendSuccess(res, data);
  });

  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const d = await this.service.create(req.body);
    sendSuccess(res, d, 'Dispatch created', 201);
  });

  updateStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status, progressPercent } = req.body;
    const d = await this.service.updateStatus(
      String(req.params.id),
      status as DispatchStatus,
      progressPercent
    );
    sendSuccess(res, d, 'Dispatch updated');
  });

  eta = asyncHandler(async (req: AuthRequest, res: Response) => {
    const route = await this.service.getETA(String(req.params.id));
    sendSuccess(res, route);
  });
}
