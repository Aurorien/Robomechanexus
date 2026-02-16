import express from 'express';
import path from 'path';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { registerRoutes } from './routes/index.js';

export function createApp() {
  const app = express();

  // Built-in middleware
  app.use(express.json());

  // Custom middleware - logging
  app.use(requestLogger);

  // Register API routes
  registerRoutes(app);

  // Serve static files
  app.use(express.static(path.join(path.resolve(), 'public')));

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
}
