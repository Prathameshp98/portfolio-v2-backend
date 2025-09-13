const mongoose = require('mongoose');
const { getEnvVar } = require('./environment');

class DatabaseConnection {
    constructor() {
        this.connection = null;
    }

    /**
     * Build MongoDB connection URI from environment variables
     * @returns {string} MongoDB connection URI
     */
    buildConnectionURI() {
        const user = getEnvVar('MONGO_DATABASE_USER');
        const password = getEnvVar('MONGO_DATABASE_PASSWORD');
        const cluster = getEnvVar('MONGO_DATABASE_CLUSTER');
        const dbName = getEnvVar('MONGO_DATABASE_NAME');
        
        return `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
    }

    /**
     * Connect to MongoDB database
     * @returns {Promise<void>}
     */
    async connect() {
        try {
            const uri = this.buildConnectionURI();
            this.connection = await mongoose.connect(uri);
            console.log('✅ Connected to MongoDB successfully');
            return this.connection;
        } catch (error) {
            console.error('❌ MongoDB connection error:', error.message);
            throw error;
        }
    }

    /**
     * Disconnect from MongoDB database
     * @returns {Promise<void>}
     */
    async disconnect() {
        try {
            if (this.connection) {
                await mongoose.connection.close();
                console.log('✅ Disconnected from MongoDB');
            }
        } catch (error) {
            console.error('❌ Error disconnecting from MongoDB:', error.message);
            throw error;
        }
    }

    /**
     * Get current connection status
     * @returns {number} Connection state
     */
    getConnectionState() {
        return mongoose.connection.readyState;
    }
}

// Export singleton instance
const dbConnection = new DatabaseConnection();
module.exports = dbConnection;
