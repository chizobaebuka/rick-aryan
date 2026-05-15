import { Router } from 'express';
import { RFQController } from './rfq.controller';
import { authenticate } from '../../middlewares/authenticate';
import { authorize } from '../../middlewares/authorize';
import { validateBody, validateQuery, validateParam } from '../../middlewares/validate';
import {
  createRFQSchema,
  updateRFQStatusSchema,
  rfqQuerySchema,
  rfqParamSchema,
  rfqNoteSchema,
} from './rfq.validators';

const router = Router();
const ctrl = new RFQController();

router.post('/', validateBody(createRFQSchema), ctrl.createRFQ);

router.get('/', authenticate, validateQuery(rfqQuerySchema), ctrl.getAllRFQs);
router.get('/:id', authenticate, validateParam(rfqParamSchema), ctrl.getRFQById);
router.patch(
  '/:id/status',
  authenticate,
  authorize('master_admin', 'ops_manager'),
  validateParam(rfqParamSchema),
  validateBody(updateRFQStatusSchema),
  ctrl.updateRFQStatus
);
router.post(
  '/:id/notes',
  authenticate,
  validateParam(rfqParamSchema),
  validateBody(rfqNoteSchema),
  ctrl.addActivityNote
);
router.delete(
  '/:id',
  authenticate,
  authorize('master_admin'),
  validateParam(rfqParamSchema),
  ctrl.deleteRFQ
);

export default router;
