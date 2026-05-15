import { Response } from 'express';
import { Request } from 'express';
import { CatalogService } from './catalog.service';
import { sendSuccess } from '../../helpers/apiResponse.helper';
import { asyncHandler } from '../../utils/asyncHandler';

export class CatalogController {
  private service = new CatalogService();

  list = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.service.list(req.query as never);
    sendSuccess(res, result);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const chemical = await this.service.getById(String(req.params.id));
    sendSuccess(res, chemical);
  });
}
