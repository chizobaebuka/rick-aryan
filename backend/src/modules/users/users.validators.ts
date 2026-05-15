import Joi from 'joi';
import { UserRole } from '../../entities/User';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  fullName: Joi.string().min(2).max(200).required(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .required(),
});

export const updateUserSchema = Joi.object({
  fullName: Joi.string().min(2).max(200).optional(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .optional(),
  isActive: Joi.boolean().optional(),
  avatarUrl: Joi.string().uri().allow(null).optional(),
}).min(1);

export const userParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
