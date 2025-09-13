const express = require('express');
const { validateEnvironment, getServerConfig } = require('./config/environment');
const dbConnection = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const { globalErrorHandler, handleNotFound } = require('./middleware/errorHandler');
const { sanitizeInput } = require('./middleware/validation');
const routes = require('./routes/routes');

// Validate environment variables on startup
try {
    validateEnvironment();
} catch (error) {
    console.error('❌ Environment validation failed:', error.message);
    process.exit(1);
}

const app = express();
const { port } = getServerConfig();

// Global middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);
app.use(corsMiddleware);

// Root endpoint - API documentation
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Portfolio Backend API',
        version: '2.0.0',
        endpoints: {
            health: '/health',
            api: '/api/*'
        },
        documentation: {
            'GET /health': 'Server health check',
            'GET /api/intro?locale=en-US': 'Introduction content',
            'GET /api/about?locale=en-US': 'About section content',
            'GET /api/experience?locale=en-US': 'Experience content',
            'GET /api/project?locale=en-US': 'Projects content',
            'GET /api/writing?locale=en-US': 'Writing content',
            'GET /api/footer?locale=en-US': 'Footer content',
            'GET /api/certifications?locale=en-US': 'Certifications content',
            'GET /api/social': 'Social media links',
            'GET /api/icon': 'Icon data'
        },
        supportedLocales: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'ja-JP', 'ko-KR', 'zh-CN']
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Favicon endpoint to prevent 404 logs
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// API routes
app.use('/api', routes);

// Handle undefined routes
app.all('*', handleNotFound);

// Global error handling middleware
app.use(globalErrorHandler);

/**
 * Start server function
 */
const startServer = async () => {
    try {
        // Connect to database
        await dbConnection.connect();
        
        // Start server
        const server = app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 Health check: http://localhost:${port}/health`);
        });
        
        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            console.log(`\n📡 Received ${signal}. Starting graceful shutdown...`);
            
            server.close(async () => {
                console.log('🔒 HTTP server closed');
                
                try {
                    await dbConnection.disconnect();
                    console.log('✅ Graceful shutdown completed');
                    process.exit(0);
                } catch (error) {
                    console.error('❌ Error during shutdown:', error);
                    process.exit(1);
                }
            });
        };
        
        // Handle shutdown signals
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

// Start the server
startServer();

module.exports = app;
