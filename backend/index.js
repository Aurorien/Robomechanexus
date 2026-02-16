import { createApp } from './src/app.js';
import { initializeDatabase } from './src/config/database.js';
import { config, validateConfig } from './src/config/environment.js';

async function startServer() {
  try {
    // Validate configuration
    validateConfig();
    console.log('Configuration validated successfully');

    // Initialize database connection
    await initializeDatabase();

    // Create and start Express app
    const app = createApp();
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Ready at http://localhost:${config.port}/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
