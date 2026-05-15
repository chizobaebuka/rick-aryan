import { Response } from 'express';
import { RFQService } from './rfq.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';
import { AuthRequest } from '../../middlewares/authenticate';
import { RFQStatus } from '../../entities/RFQ';

export class RFQController {
  private service = new RFQService();

  createRFQ = asyncHandler(async (req: AuthRequest, res: Response) => {
    const rfq = await this.service.createRFQ(req.body);
    sendSuccess(res, rfq, 'RFQ created successfully', 201);
  });

  getAllRFQs = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await this.service.getAllRFQs(req.query as never);
    sendSuccess(res, result);
  });

  getRFQById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const rfq = await this.service.getRFQById(String(req.params.id));
    sendSuccess(res, rfq);
  });

  updateRFQStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
    const rfq = await this.service.updateRFQStatus(
      String(req.params.id),
      req.body.status as RFQStatus
    );
    sendSuccess(res, rfq, 'Status updated');
  });

  addActivityNote = asyncHandler(async (req: AuthRequest, res: Response) => {
    const actor = req.user?.fullName ?? 'System';
    const rfq = await this.service.addActivityNote(String(req.params.id), req.body.message, actor);
    sendSuccess(res, rfq, 'Note added');
  });

  deleteRFQ = asyncHandler(async (req: AuthRequest, res: Response) => {
    await this.service.deleteRFQ(String(req.params.id));
    sendSuccess(res, null, 'RFQ deleted', 204);
  });
}
