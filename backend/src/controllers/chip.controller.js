import * as chipService from '../services/chip.service.js';

export async function getChips(req, res, next) {
  try {
    const chips = await chipService.getAllChips();
    res.status(200).json(chips);
  } catch (error) {
    next(error);
  }
}

export async function createChip(req, res, next) {
  try {
    const chipData = {
      name: req.body.name,
      use: req.body.use,
      type: req.body.type
    };

    const chip = await chipService.createChipWithType(chipData);
    
    res.status(201).json({
      message: 'Chip created successfully',
      chip
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteChip(req, res, next) {
  try {
    const chipId = parseInt(req.params.id, 10);
    const result = await chipService.deleteChip(chipId);
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
