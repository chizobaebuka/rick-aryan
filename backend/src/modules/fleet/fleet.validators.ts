import Joi from 'joi';

export const vehicleParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const vehicleLocationSchema = Joi.object({
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});
