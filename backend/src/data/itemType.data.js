import { pool } from '../config/database.js';
import { DatabaseError } from '../utils/errors.js';

export async function createItemType(typeName, client = null) {
  const dbClient = client || pool;
  
  try {
    const sql = `
      INSERT INTO item_type (item_type_name) 
      VALUES ($1) 
      RETURNING *
    `;
    const { rows } = await dbClient.query(sql, [typeName]);
    return rows[0];
  } catch (error) {
    throw new DatabaseError('Failed to create item type', error);
  }
}

export async function getItemTypeByName(typeName) {
  try {
    const sql = 'SELECT * FROM item_type WHERE item_type_name = $1';
    const { rows } = await pool.query(sql, [typeName]);
    return rows[0] || null;
  } catch (error) {
    throw new DatabaseError('Failed to retrieve item type', error);
  }
}
