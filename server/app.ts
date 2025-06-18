import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import logger from './logger';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Security headers with CSP for Unsplash
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": [
          "'self'",
          'data:',
          'https://images.unsplash.com',
          'https://upload.wikimedia.org',
        ],
        "script-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(cors());

// Logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Swagger setup (only /version)
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Fashionista API', version: '1.0.0' },
  },
  apis: [path.join(__dirname, 'app.ts')],
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /version:
 *   get:
 *     summary: Get app version
 *     responses:
 *       200:
 *         description: App version
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 */
app.get('/version', (_req: Request, res: Response) => {
  res.json({ version: process.env.npm_package_version || '1.0.0' });
});

// Landing page (not in Swagger)
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
// Products page (not in Swagger)
app.get('/products', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'products.html'));
});
// Contact page (not in Swagger)
app.get('/contact', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'contact.html'));
});
// Cart page (not in Swagger)
app.get('/cart', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'cart.html'));
});

// Centralized error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app; 