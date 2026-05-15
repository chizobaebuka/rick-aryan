import { Response } from 'express';
import { InventoryService } from './inventory.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';
import { AuthRequest } from '../../middlewares/authenticate';

export class InventoryController {
  private service = new InventoryService();

  list = asyncHandler(async (req: AuthRequest, res: Response) => {
    const q = req.query as unknown as { page: number; limit: number };
    const result = await this.service.list(q.page, q.limit);
    sendSuccess(res, result);
  });

  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const entry = await this.service.create(req.body);
    sendSuccess(res, entry, 'Stock entry created', 201);
  });

  update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const entry = await this.service.update(String(req.params.id), req.body);
    sendSuccess(res, entry, 'Stock entry updated');
  });

  alerts = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await this.service.alerts();
    sendSuccess(res, data);
  });
}
