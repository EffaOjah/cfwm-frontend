const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Authentication required. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cfwm_secret_key_2026');

        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
