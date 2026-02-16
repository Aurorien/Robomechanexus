export function validateChipCreation(req, res, next) {
  const { name, use, type } = req.body;

  const errors = [];

  if (!name || (typeof name === 'string' && name.trim() === '')) {
    errors.push('name is required and cannot be empty');
  }

  if (!use || (typeof use === 'string' && use.trim() === '')) {
    errors.push('use is required and cannot be empty');
  }

  if (!type || (typeof type === 'string' && type.trim() === '')) {
    errors.push('type is required and cannot be empty');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: `Validation failed: ${errors.join(', ')}`,
        statusCode: 400,
        type: 'ValidationError'
      }
    });
  }

  next();
}

export function validateChipId(req, res, next) {
  const { id } = req.params;

  const chipId = parseInt(id, 10);

  if (isNaN(chipId) || chipId <= 0 || !Number.isInteger(chipId)) {
    return res.status(400).json({
      error: {
        message: 'Validation failed: id must be a valid positive integer',
        statusCode: 400,
        type: 'ValidationError'
      }
    });
  }

  next();
}
