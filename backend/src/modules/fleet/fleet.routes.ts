import { Router } from 'express';
import { FleetController } from './fleet.controller';
import { authenticate } from '../../middlewares/authenticate';
import { authorize } from '../../middlewares/authorize';
import { validateBody, validateParam } from '../../middlewares/validate';
import { vehicleLocationSchema, vehicleParamSchema } from './fleet.validators';

const router = Router();
const ctrl = new FleetController();

router.use(authenticate);

router.get('/vehicles', ctrl.list);
router.get('/vehicles/:id', validateParam(vehicleParamSchema), ctrl.getOne);
router.patch(
  '/vehicles/:id/location',
  authorize('master_admin', 'ops_manager', 'supervisor', 'driver'),
  validateParam(vehicleParamSchema),
  validateBody(vehicleLocationSchema),
  ctrl.updateLocation
);

export default router;
