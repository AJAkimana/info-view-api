import express from 'express';
import compression from 'compression';
import passport from '@configs/passport-config';
import cors from 'cors';
import 'dotenv/config';
import { session } from '@configs/session';
import { corseOptions, applySecurity } from '@configs/security';
import appRoutes from './apps';
import { errorHandler } from './apps/app/middlewares';
import { initializeDatabase } from '@configs/database';

const app = express();
const PORT = process.env.PORT || 3000;

initializeDatabase();

app.use(cors(corseOptions));
applySecurity(app);
app.use(compression());
app.use(
  express.urlencoded({
    limit: '100mb',
    parameterLimit: 100000,
    extended: false,
  }),
);
app.use(express.json({ limit: '100mb' }));

/**
 * Initialize passport and session
 */
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello from TypeScript Express!');
});

/**
 * App routes
 */
app.use('/api/v1', appRoutes);

/**
 * Error handling middleware
 */
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
