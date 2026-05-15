import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticate } from '../../middlewares/authenticate';
import { authorize } from '../../middlewares/authorize';
import { validateBody, validateParam } from '../../middlewares/validate';
import { createUserSchema, updateUserSchema, userParamSchema } from './users.validators';

const router = Router();
const ctrl = new UsersController();

router.use(authenticate, authorize('master_admin'));

router.get('/', ctrl.list);
router.post('/', validateBody(createUserSchema), ctrl.create);
router.patch('/:id', validateParam(userParamSchema), validateBody(updateUserSchema), ctrl.update);
router.delete('/:id', validateParam(userParamSchema), ctrl.deactivate);

export default router;
