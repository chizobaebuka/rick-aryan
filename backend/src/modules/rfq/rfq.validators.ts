import Joi from 'joi';
import { RFQPriority, RFQStatus } from '../../entities/RFQ';

export const createRFQSchema = Joi.object({
  companyName: Joi.string().min(2).max(200).required(),
  contactEmail: Joi.string().email().required(),
  location: Joi.string().required(),
  productRequested: Joi.string().required(),
  quantityMT: Joi.number().positive().required(),
  deliveryLeadTime: Joi.string().optional(),
  notes: Joi.string().max(1000).optional(),
  priority: Joi.string()
    .valid(...Object.values(RFQPriority))
    .default(RFQPriority.NORMAL),
});

export const updateRFQStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(RFQStatus))
    .required(),
});

export const rfqQuerySchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(20),
  status: Joi.string()
    .valid(...Object.values(RFQStatus))
    .optional(),
});

export const rfqParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const rfqNoteSchema = Joi.object({
  message: Joi.string().min(1).max(2000).required(),
});
