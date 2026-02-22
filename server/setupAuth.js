const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const setupAuth = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'cfwm_db'
    });

    try {
        console.log('--- Auth Setup Started ---');

        // 1. Create admins table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('superadmin', 'admin') DEFAULT 'admin',
                last_login TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Admins table ready');

        // 2. Check if initial admin exists
        const adminEmail = 'cfwmadmin@cfwm.com';
        const [existing] = await connection.query('SELECT id FROM admins WHERE email = ?', [adminEmail]);

        if (existing.length === 0) {
            const id = require('crypto').randomUUID();
            const hashedPassword = await bcrypt.hash('XPRESS@@', 10);

            await connection.query(
                'INSERT INTO admins (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
                [id, 'CFWM Admin', adminEmail, hashedPassword, 'superadmin']
            );
            console.log(`✅ Initial admin created: ${adminEmail}`);
        } else {
            console.log('ℹ️ Admin user already exists');
        }

        console.log('--- Auth Setup Completed ---');
    } catch (error) {
        console.error('❌ Setup failed:', error);
    } finally {
        await connection.end();
    }
};

setupAuth();
