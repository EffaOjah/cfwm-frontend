const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const logger = require('./services/logger');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses

// HTTP Request Logging (Morgan + Winston)
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { status: 'error', message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const eventRoutes = require('./routes/eventRoutes.js');
const testimonyRoutes = require('./routes/testimonyRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const sermonRoutes = require('./routes/sermonRoutes.js');
const locationRoutes = require('./routes/locationRoutes.js');
const formRoutes = require('./routes/formRoutes.js');
const statsRoutes = require('./routes/statsRoutes.js');
const newsletterRoutes = require('./routes/newsletterRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');
const apaproRoutes = require('./routes/apaproRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const authMiddleware = require('./services/authMiddleware.js');

// Database
const { testConnection } = require('./config/database.js');

// --- SECURE ROUTE PROTECTION ---

// 1. PUBLIC READ / ADMIN WRITE (Events, Store, Sermons, Locations, Apapro, Testimonies)
const protectedModules = [
    '/api/events',
    '/api/products',
    '/api/sermons',
    '/api/locations',
    '/api/apapro',
    '/api/testimonies'
];
app.use(protectedModules, (req, res, next) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        return authMiddleware(req, res, next);
    }
    next();
});

// 2. ADMIN ONLY READ/WRITE (Stats, Newsletter, Forms List)
app.use('/api/stats', authMiddleware);
app.use('/api/newsletter', authMiddleware);
app.use('/api/forms/all', authMiddleware); // If there's an 'all' endpoint
app.use(['/api/forms/first-timers', '/api/forms/prayer-requests'], (req, res, next) => {
    if (req.method === 'GET') {
        return authMiddleware(req, res, next);
    }
    next();
});

// 3. Register Routes
app.use('/api/events', eventRoutes);
app.use('/api/testimonies', testimonyRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sermons', sermonRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/apapro', apaproRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', authRoutes);






// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'CFWM Backend API',
        version: '1.0.0'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err.stack);

    res.status(err.status || 500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
    });
});

// Handle unhandled rejections/exceptions
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    // Give time for logging before exiting
    setTimeout(() => process.exit(1), 1000);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);

    // Test database connection
    await testConnection();
});

module.exports = app;
