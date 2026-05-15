import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import { rateLimiter } from './middlewares/rateLimiter';

import authRoutes from './modules/auth/auth.routes';
import inventoryRoutes from './modules/inventory/inventory.routes';
import rfqRoutes from './modules/rfq/rfq.routes';
import fleetRoutes from './modules/fleet/fleet.routes';
import dispatchRoutes from './modules/dispatch/dispatch.routes';
import financialsRoutes from './modules/financials/financials.routes';
import usersRoutes from './modules/users/users.routes';
import catalogRoutes from './modules/catalog/catalog.routes';

const createApp = (): Application => {
  const app = express();

  const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((s) => s.trim()).filter(Boolean)
    : ['http://localhost:3000'];

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === 'development'
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    optionsSuccessStatus: 200, // For legacy browser compatibility
  };

  app.use(cors(corsOptions));

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined'));
  app.use(rateLimiter);

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api/auth', authRoutes);
  app.use('/api/inventory', inventoryRoutes);
  app.use('/api/rfqs', rfqRoutes);
  app.use('/api/fleet', fleetRoutes);
  app.use('/api/dispatch', dispatchRoutes);
  app.use('/api/financials', financialsRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/catalog', catalogRoutes);

  app.get('/health', (_req, res) => res.json({ status: 'OK', service: 'Rick Aryan API' }));

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
