import express from 'express';
import * as chipController from '../controllers/chip.controller.js';
import { validateChipCreation, validateChipId } from '../middleware/validator.js';

const router = express.Router();

router.get('/', chipController.getChips);
router.post('/', validateChipCreation, chipController.createChip);
router.delete('/:id', validateChipId, chipController.deleteChip);

export default router;
