const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
            }

            // Find admin
            const [rows] = await db.pool.query('SELECT * FROM admins WHERE email = ?', [email]);
            const admin = rows[0];

            if (!admin) {
                return res.status(401).json({ status: 'error', message: 'Invalid credentials.' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ status: 'error', message: 'Invalid credentials.' });
            }

            // Update last login
            await db.pool.query('UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [admin.id]);

            // Create token
            const token = jwt.sign(
                { id: admin.id, email: admin.email, role: admin.role, name: admin.name },
                process.env.JWT_SECRET || 'cfwm_secret_key_2026',
                { expiresIn: '24h' }
            );

            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                token,
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ status: 'error', message: 'Something went wrong during login.' });
        }
    },

    me: async (req, res) => {
        // req.admin is populated by authMiddleware
        res.status(200).json({
            status: 'success',
            admin: req.admin
        });
    }
};

module.exports = authController;
