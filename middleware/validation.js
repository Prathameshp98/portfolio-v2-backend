const { AppError } = require('./errorHandler');

/**
 * Validate locale parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateLocale = (req, res, next) => {
    const { locale } = req.query;
    
    if (!locale) {
        return next(new AppError('Locale parameter is required', 400));
    }
    
    // Accept both formats: 'en' or 'en-US'
    const localeRegex = /^[a-z]{2}(-[A-Z]{2})?$/;
    if (!localeRegex.test(locale)) {
        return next(new AppError('Invalid locale format. Expected format: xx or xx-XX (e.g., en or en-US)', 400));
    }
    
    // Normalize locale to full format if only language code is provided
    if (locale.length === 2) {
        const localeMap = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'it': 'it-IT',
            'pt': 'pt-BR',
            'ja': 'ja-JP',
            'ko': 'ko-KR',
            'zh': 'zh-CN'
        };
        req.query.locale = localeMap[locale] || `${locale}-${locale.toUpperCase()}`;
    }
    
    next();
};

/**
 * Validate request body
 * @param {Array} requiredFields - Array of required field names
 * @returns {Function} Express middleware function
 */
const validateRequiredFields = (requiredFields = []) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
        }
        
        next();
    };
};

/**
 * Sanitize request data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const sanitizeInput = (req, res, next) => {
    // Remove any potential script tags from string inputs
    const sanitizeString = (str) => {
        if (typeof str !== 'string') return str;
        return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    };
    
    // Recursively sanitize object properties
    const sanitizeObject = (obj) => {
        if (obj === null || typeof obj !== 'object') {
            return sanitizeString(obj);
        }
        
        if (Array.isArray(obj)) {
            return obj.map(sanitizeObject);
        }
        
        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
            sanitized[key] = sanitizeObject(value);
        }
        return sanitized;
    };
    
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }
    
    next();
};

module.exports = {
    validateLocale,
    validateRequiredFields,
    sanitizeInput
};
