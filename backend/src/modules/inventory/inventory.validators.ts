import Joi from 'joi';

export const inventoryQuerySchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(20),
});

export const createStockSchema = Joi.object({
  chemicalId: Joi.string().uuid().required(),
  stockLevelMT: Joi.number().positive().required(),
  reorderLevelMT: Joi.number().positive().required(),
  capacityMT: Joi.number().positive().optional(),
  batchNumber: Joi.string().min(2).max(64).required(),
  expiryDate: Joi.string().isoDate().optional(),
  storageLocation: Joi.string().max(200).optional(),
});

export const updateStockSchema = Joi.object({
  stockLevelMT: Joi.number().positive().optional(),
  reorderLevelMT: Joi.number().positive().optional(),
  capacityMT: Joi.number().positive().allow(null).optional(),
  batchNumber: Joi.string().min(2).max(64).optional(),
  expiryDate: Joi.string().isoDate().allow(null).optional(),
  storageLocation: Joi.string().max(200).allow(null).optional(),
}).min(1);

export const stockParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
