import { Router } from 'express';
import { FinancialsController } from './financials.controller';
import { authenticate } from '../../middlewares/authenticate';
import { authorize } from '../../middlewares/authorize';
import { validateBody, validateQuery } from '../../middlewares/validate';
import { createInvoiceSchema, invoiceQuerySchema } from './financials.validators';

const router = Router();
const ctrl = new FinancialsController();

router.use(authenticate);

router.get('/summary', ctrl.summary);
router.get('/invoices', validateQuery(invoiceQuerySchema), ctrl.list);
router.post(
  '/invoices',
  authorize('master_admin', 'ops_manager', 'supervisor'),
  validateBody(createInvoiceSchema),
  ctrl.create
);

export default router;
