import { Response } from 'express';
import { FinancialsService } from './financials.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';
import { AuthRequest } from '../../middlewares/authenticate';

export class FinancialsController {
  private service = new FinancialsService();

  list = asyncHandler(async (req: AuthRequest, res: Response) => {
    const q = req.query as unknown as { page: number; limit: number };
    const result = await this.service.listInvoices(q.page, q.limit);
    sendSuccess(res, result);
  });

  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const inv = await this.service.createInvoice(req.body);
    sendSuccess(res, inv, 'Invoice created', 201);
  });

  summary = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await this.service.summary();
    sendSuccess(res, data);
  });
}
