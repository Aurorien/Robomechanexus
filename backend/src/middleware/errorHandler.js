import { ValidationError, NotFoundError, DatabaseError } from '../utils/errors.js';

export function errorHandler(err, req, res, next) {
  // Log error with stack trace
  console.error('Error occurred:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Handle ValidationError
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
        type: err.name
      }
    });
  }

  // Handle NotFoundError
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
        type: err.name
      }
    });
  }

  // Handle DatabaseError
  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
        type: err.name
      }
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    error: {
      message: 'Internal Server Error',
      statusCode: 500,
      type: 'Error'
    }
  });
}
