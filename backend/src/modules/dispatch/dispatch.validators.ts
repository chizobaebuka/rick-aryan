import Joi from 'joi';
import { DispatchStatus } from '../../entities/Dispatch';

export const createDispatchSchema = Joi.object({
  vehicleId: Joi.string().uuid().required(),
  driverId: Joi.string().uuid().required(),
  driverName: Joi.string().min(2).max(200).required(),
  loadDescription: Joi.string().min(2).max(500).required(),
  destinationName: Joi.string().min(2).max(200).required(),
  destinationLat: Joi.number().min(-90).max(90).required(),
  destinationLng: Joi.number().min(-180).max(180).required(),
});

export const updateDispatchStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(DispatchStatus))
    .required(),
  progressPercent: Joi.number().min(0).max(100).optional(),
});

export const dispatchParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
