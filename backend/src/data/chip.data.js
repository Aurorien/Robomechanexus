import { pool } from '../config/database.js';
import { DatabaseError } from '../utils/errors.js';

export async function getAllChips() {
  try {
    const sql = `
      SELECT c.chip_id, c.chip_name, c.chip_use, it.item_type_name 
      FROM chip c 
      INNER JOIN item_type it ON c.chip_item_type_id = it.item_type_id
    `;
    const { rows } = await pool.query(sql);
    return rows;
  } catch (error) {
    throw new DatabaseError('Failed to retrieve chips', error);
  }
}

export async function createChip(chipData, client = null) {
  const dbClient = client || pool;
  
  try {
    const sql = `
      INSERT INTO chip (chip_name, chip_use, chip_item_type_id) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const values = [chipData.name, chipData.use, chipData.itemTypeId];
    const { rows } = await dbClient.query(sql, values);
    return rows[0];
  } catch (error) {
    throw new DatabaseError('Failed to create chip', error);
  }
}

export async function deleteChipById(chipId, client = null) {
  const dbClient = client || pool;
  
  try {
    const sql = 'DELETE FROM chip WHERE chip_id = $1';
    const result = await dbClient.query(sql, [chipId]);
    return result.rowCount;
  } catch (error) {
    throw new DatabaseError('Failed to delete chip', error);
  }
}

export async function getChipById(chipId) {
  try {
    const sql = `
      SELECT c.chip_id, c.chip_name, c.chip_use, c.chip_item_type_id, it.item_type_name 
      FROM chip c 
      INNER JOIN item_type it ON c.chip_item_type_id = it.item_type_id 
      WHERE c.chip_id = $1
    `;
    const { rows } = await pool.query(sql, [chipId]);
    return rows[0] || null;
  } catch (error) {
    throw new DatabaseError('Failed to retrieve chip', error);
  }
}
