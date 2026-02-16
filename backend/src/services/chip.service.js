import { getClient } from '../config/database.js';
import * as chipData from '../data/chip.data.js';
import * as itemTypeData from '../data/itemType.data.js';
import { ValidationError, NotFoundError, DatabaseError } from '../utils/errors.js';

export async function getAllChips() {
  try {
    return await chipData.getAllChips();
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError('Failed to retrieve chips', error);
  }
}

export async function createChipWithType(chipData) {
  const { name, use, type } = chipData;

  // Validate input
  if (!name || !use || !type) {
    throw new ValidationError('Missing required fields: name, use, and type are required');
  }

  const client = await getClient();
  
  try {
    await client.query('BEGIN');

    // Create item type
    const itemType = await itemTypeData.createItemType(type, client);
    
    // Create chip with the new item type ID
    const chip = await chipData.createChip(
      { name, use, itemTypeId: itemType.item_type_id },
      client
    );

    await client.query('COMMIT');
    return chip;
  } catch (error) {
    await client.query('ROLLBACK');
    
    if (error instanceof ValidationError || error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError('Failed to create chip with type', error);
  } finally {
    client.release();
  }
}

export async function deleteChip(chipId) {
  // Validate input
  if (!chipId || isNaN(chipId) || chipId <= 0) {
    throw new ValidationError('Invalid chip ID');
  }

  const client = await getClient();
  
  try {
    await client.query('BEGIN');

    const rowCount = await chipData.deleteChipById(chipId, client);
    
    if (rowCount === 0) {
      throw new NotFoundError(`No chip found with ID ${chipId}`);
    }

    await client.query('COMMIT');
    return { message: `Chip with ID ${chipId} successfully deleted` };
  } catch (error) {
    await client.query('ROLLBACK');
    
    if (error instanceof NotFoundError || error instanceof ValidationError || error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError('Failed to delete chip', error);
  } finally {
    client.release();
  }
}
