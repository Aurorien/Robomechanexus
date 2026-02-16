import chipRoutes from './chip.routes.js';

export function registerRoutes(app) {
  app.use('/api/chips', chipRoutes);
}
