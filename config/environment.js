const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Get environment variable with validation
 * @param {string} key - Environment variable key
 * @param {string} defaultValue - Default value if not found
 * @returns {string} Environment variable value
 * @throws {Error} If required variable is missing
 */
function getEnvVar(key, defaultValue = null) {
    const value = process.env[key];
    
    if (!value && defaultValue === null) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    
    return value || defaultValue;
}

/**
 * Get server configuration
 * @returns {Object} Server configuration object
 */
function getServerConfig() {
    return {
        port: getEnvVar('PORT', 3000),
        nodeEnv: getEnvVar('NODE_ENV', 'development'),
        corsOrigin: getEnvVar('CORS_ORIGIN', '*')
    };
}

/**
 * Get database configuration
 * @returns {Object} Database configuration object
 */
function getDatabaseConfig() {
    return {
        user: getEnvVar('MONGO_DATABASE_USER'),
        password: getEnvVar('MONGO_DATABASE_PASSWORD'),
        cluster: getEnvVar('MONGO_DATABASE_CLUSTER'),
        name: getEnvVar('MONGO_DATABASE_NAME')
    };
}

/**
 * Validate all required environment variables
 * @throws {Error} If any required variables are missing
 */
function validateEnvironment() {
    const requiredVars = [
        'MONGO_DATABASE_USER',
        'MONGO_DATABASE_PASSWORD',
        'MONGO_DATABASE_CLUSTER',
        'MONGO_DATABASE_NAME'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
}

module.exports = {
    getEnvVar,
    getServerConfig,
    getDatabaseConfig,
    validateEnvironment
};
