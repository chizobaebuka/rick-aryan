import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateBody } from '../../middlewares/validate';
import { loginSchema, registerSchema } from './auth.validators';

const router = Router();
const ctrl = new AuthController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/login', validateBody(loginSchema), ctrl.login);
router.post('/register', validateBody(registerSchema), ctrl.register);
router.post('/refresh', ctrl.refresh);

export default router;
