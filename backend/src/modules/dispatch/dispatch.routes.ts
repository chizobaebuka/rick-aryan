import { Router } from 'express';
import { DispatchController } from './dispatch.controller';
import { authenticate } from '../../middlewares/authenticate';
import { authorize } from '../../middlewares/authorize';
import { validateBody, validateParam } from '../../middlewares/validate';
import {
  createDispatchSchema,
  dispatchParamSchema,
  updateDispatchStatusSchema,
} from './dispatch.validators';

const router = Router();
const ctrl = new DispatchController();

router.use(authenticate);

router.get('/', ctrl.list);
router.post(
  '/',
  authorize('master_admin', 'ops_manager', 'supervisor'),
  validateBody(createDispatchSchema),
  ctrl.create
);
router.patch(
  '/:id/status',
  authorize('master_admin', 'ops_manager', 'supervisor', 'driver'),
  validateParam(dispatchParamSchema),
  validateBody(updateDispatchStatusSchema),
  ctrl.updateStatus
);
router.get('/:id/eta', validateParam(dispatchParamSchema), ctrl.eta);

export default router;
