/**
 * Custom error class for application errors
 */
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error for debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Handle different error types
    if (err.name === 'ValidationError') {
        return handleValidationError(err, res);
    }
    
    if (err.name === 'CastError') {
        return handleCastError(err, res);
    }
    
    if (err.code === 11000) {
        return handleDuplicateKeyError(err, res);
    }

    // Send error response
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.isOperational ? err.message : 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

/**
 * Handle Mongoose validation errors
 */
const handleValidationError = (err, res) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const message = `Invalid input data: ${errors.join('. ')}`;
    
    res.status(400).json({
        success: false,
        status: 'fail',
        message,
        errors
    });
};

/**
 * Handle Mongoose cast errors
 */
const handleCastError = (err, res) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    
    res.status(400).json({
        success: false,
        status: 'fail',
        message
    });
};

/**
 * Handle duplicate key errors
 */
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value: ${field}. Please use another value!`;
    
    res.status(400).json({
        success: false,
        status: 'fail',
        message
    });
};

/**
 * Catch async errors wrapper
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

/**
 * Handle 404 errors for undefined routes
 */
const handleNotFound = (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
};

module.exports = {
    AppError,
    globalErrorHandler,
    catchAsync,
    handleNotFound
};
