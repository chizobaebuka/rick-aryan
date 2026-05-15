import Joi from 'joi';

export const catalogQuerySchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(7),
  category: Joi.string().max(100).optional(),
  search: Joi.string().max(200).optional(),
});

export const catalogParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
