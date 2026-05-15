import { Router } from 'express';
import { InventoryController } from './inventory.controller';
import { authenticate } from '../../middlewares/authenticate';
import { authorize } from '../../middlewares/authorize';
import { validateBody, validateParam, validateQuery } from '../../middlewares/validate';
import {
  createStockSchema,
  inventoryQuerySchema,
  stockParamSchema,
  updateStockSchema,
} from './inventory.validators';

const router = Router();
const ctrl = new InventoryController();

router.use(authenticate);

router.get('/alerts', ctrl.alerts);
router.get('/', validateQuery(inventoryQuerySchema), ctrl.list);
router.post('/', authorize('master_admin', 'ops_manager', 'supervisor'), validateBody(createStockSchema), ctrl.create);
router.patch(
  '/:id',
  authorize('master_admin', 'ops_manager'),
  validateParam(stockParamSchema),
  validateBody(updateStockSchema),
  ctrl.update
);

export default router;
