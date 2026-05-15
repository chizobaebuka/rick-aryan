import { Router } from 'express';
import { CatalogController } from './catalog.controller';
import { validateParam, validateQuery } from '../../middlewares/validate';
import { catalogParamSchema, catalogQuerySchema } from './catalog.validators';

const router = Router();
const ctrl = new CatalogController();

router.get('/', validateQuery(catalogQuerySchema), ctrl.list);
router.get('/:id', validateParam(catalogParamSchema), ctrl.getById);

export default router;
