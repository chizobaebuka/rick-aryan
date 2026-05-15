import 'reflect-metadata';
import 'dotenv/config';
import { validateEnv } from './config/env';
import { AppDataSource } from './config/database';
import createApp from './app';
import { logger } from './utils/logger';
import { runSeed } from './seed';

validateEnv();

const PORT = Number(process.env.PORT) || 5001;

AppDataSource.initialize()
  .then(async () => {
    logger.info('✅ PostgreSQL connected via TypeORM');
    if (process.env.NODE_ENV === 'development') {
      await runSeed();
      logger.info('🌱 Dev seed applied (if empty tables)');
    }
    const app = createApp();
    app.listen(PORT, () => {
      logger.info(`🚀 Rick Aryan API running on port ${PORT}`);
      logger.info(`📚 Swagger docs at /api/docs`);
    });
  })
  .catch((err) => {
    logger.error('❌ Database connection failed:', err);
    process.exit(1);
  });
