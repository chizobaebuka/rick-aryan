import Joi from 'joi';

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5001),
  DATABASE_URL: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default(
      'postgresql://postgres:postgres@127.0.0.1:5432/rick_aryan'
    ),
  }),
  JWT_SECRET: Joi.string().min(32).when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('local_development_jwt_secret_key_min_length_32_ok'),
  }),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  FRONTEND_URL: Joi.alternatives()
    .try(Joi.string().uri({ scheme: ['http', 'https'] }), Joi.string().valid(''))
    .optional(),
  VALHALLA_URL: Joi.string().uri().default('https://valhalla1.openstreetmap.de'),
});

export function validateEnv(): void {
  const { error } = schema.validate(process.env, {
    allowUnknown: true,
    stripUnknown: true,
  });
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
}
