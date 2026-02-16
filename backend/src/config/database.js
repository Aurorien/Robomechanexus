import pg from 'pg';
import { config } from './environment.js';

const { Pool } = pg;

export const dbConfig = {
  connectionString: config.database.uri,
  ssl: {
    rejectUnauthorized: false
  }
};

export const pool = new Pool(dbConfig);

export async function initializeDatabase() {
  try {
    const client = await pool.connect();
    console.log('Database is running and the connection is established.');
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

export async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

export async function getClient() {
  return await pool.connect();
}
