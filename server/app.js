require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Security headers with CSP for Unsplash
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": [
        "'self'",
        'data:',
        'https://images.unsplash.com',
        'https://upload.wikimedia.org'
      ],
      "script-src": ["'self'"],
      "style-src": ["'self'", "'unsafe-inline'"],
    },
  },
}));
app.use(cors());

// Logging
app.use((req, res, next) => {
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
  apis: [path.join(__dirname, 'app.js')],
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
app.get('/version', (req, res) => {
  res.json({ version: process.env.npm_package_version || '1.0.0' });
});

// Landing page (not in Swagger)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
// Products page (not in Swagger)
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'products.html'));
});
// Contact page (not in Swagger)
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'contact.html'));
});
// Cart page (not in Swagger)
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'cart.html'));
});

// Centralized error handler
app.use((err, req, res) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app; 