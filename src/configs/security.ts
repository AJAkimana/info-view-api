import helmet from 'helmet';
import { Express } from 'express';
import { CorsOptions } from 'cors';

export function applySecurity(app: Express) {
  app
    .use(helmet({ contentSecurityPolicy: false }))
    .use(helmet.noSniff())
    .use(helmet.frameguard({ action: 'deny' }))
    .use(helmet.xssFilter())
    .use(helmet.hidePoweredBy())
    .use(helmet.dnsPrefetchControl({ allow: false }))
    .use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
}

// Define allowed origins
/**
 * TODO: Allow dev to dev server and production likewise
 */
export const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:62784',
];
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log(`CORS request from origin: ${origin}`);

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow requests with no origin (like mobile apps or Postman)
      return callback(null, true);
    }
    // Reject requests from other origins
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Timestamp',
    'X-Signature',
  ],
  credentials: true,
};
