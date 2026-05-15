import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rick Aryan Services Ltd — API',
      version: '1.0.0',
      description: 'Industrial Chemical ERP & Logistics API',
      contact: { name: 'Rick Aryan Tech', email: 'tech@rickaryan.com' },
    },
    servers: [
      { url: 'https://api.rickaryan.com', description: 'Production' },
      { url: 'http://localhost:5001', description: 'Development' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: [path.join(__dirname, '../modules/**/*.routes.{ts,js}')],
};

export const swaggerSpec = swaggerJSDoc(options);
