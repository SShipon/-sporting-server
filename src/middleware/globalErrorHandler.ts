import { ErrorRequestHandler } from 'express';
import handelZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handelCastError';
import handleDuplicateError from '../error/handleDuplicate';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;

  if (err?.name === 'ValidationError') {
    error = handleValidationError(error);
  }

  if (err?.name === 'ZodError') {
    error = handelZodError(error);
  }

  if (err?.code === 11000) {
    error = handleDuplicateError(error);
  }

  if (err.name === 'CastError') {
    error = handleCastError(error);
  }

  const { statusCode, message, stack } = error;

  if (config.node_env === 'development') {
    res.status(statusCode).json({
      success: false,
      message: message,
      err,
      stack: stack || err.stack,
    });
  }

  if (config.node_env === 'production') {
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};

export default globalErrorHandler;
