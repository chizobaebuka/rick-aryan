import { Response } from 'express';
import { FleetService } from './fleet.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';
import { AuthRequest } from '../../middlewares/authenticate';

export class FleetController {
  private service = new FleetService();

  list = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const data = await this.service.listVehicles();
    sendSuccess(res, data);
  });

  getOne = asyncHandler(async (req: AuthRequest, res: Response) => {
    const v = await this.service.getVehicle(String(req.params.id));
    sendSuccess(res, v);
  });

  updateLocation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { latitude, longitude } = req.body;
    const v = await this.service.updateLocation(String(req.params.id), latitude, longitude);
    sendSuccess(res, v, 'Location updated');
  });
}
