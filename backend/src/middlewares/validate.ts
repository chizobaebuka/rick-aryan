import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '../utils/AppError';

type ValidationTarget = 'body' | 'query' | 'params';

const validate =
  (schema: Joi.ObjectSchema, target: ValidationTarget) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((d) => d.message).join(', ');
      return next(new AppError(messages, 422));
    }

    // In Express 5.0+, req.query and req.params are read-only getters.
    // We update the properties within the existing object instead of reassigning.
    const currentTarget = req[target] as any;
    if (currentTarget && typeof currentTarget === 'object') {
      // Clear current properties to respect stripUnknown: true
      Object.keys(currentTarget).forEach((key) => {
        delete currentTarget[key];
      });
      // Copy validated (possibly type-converted) values back
      Object.assign(currentTarget, value);
    } else {
      (req as any)[target] = value;
    }

    next();
  };

export const validateBody = (schema: Joi.ObjectSchema) => validate(schema, 'body');
export const validateQuery = (schema: Joi.ObjectSchema) => validate(schema, 'query');
export const validateParam = (schema: Joi.ObjectSchema) => validate(schema, 'params');
