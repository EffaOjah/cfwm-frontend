const { pool } = require('./config/database.js');
require('dotenv').config();

const updateFormsTables = async () => {
    try {
        console.log('🚀 Starting forms tables update...');

        const dbName = process.env.DB_NAME || 'cfwm_db';

        // Update first_timers table
        const ftColumns = [
            { name: 'status', definition: 'VARCHAR(50) DEFAULT "Pending"' },
            { name: 'email', definition: 'VARCHAR(255) DEFAULT NULL' }
        ];

        // Check for the "email?" typo and rename it to "email" if it exists
        const [emailTypoCheck] = await pool.query(
            'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = "first_timers" AND COLUMN_NAME = ?',
            [dbName, 'email?']
        );

        if (emailTypoCheck.length > 0) {
            await pool.query('ALTER TABLE first_timers CHANGE COLUMN `email?` `email` VARCHAR(255) DEFAULT NULL');
            console.log('✅ Fixed column name in first_timers: email? -> email');
        }

        for (const col of ftColumns) {
            const [check] = await pool.query(
                'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = "first_timers" AND COLUMN_NAME = ?',
                [dbName, col.name]
            );

            if (check.length === 0) {
                const query = `ALTER TABLE first_timers ADD COLUMN ${col.name} ${col.definition}`;
                await pool.query(query);
                console.log(`✅ Added column to first_timers: ${col.name}`);
            } else {
                console.log(`ℹ️ Column already exists in first_timers: ${col.name}`);
            }
        }

        // Update prayer_requests table
        const prColumns = [
            { name: 'status', definition: 'VARCHAR(50) DEFAULT "Pending"' },
            { name: 'topic', definition: 'VARCHAR(100) DEFAULT NULL' }
        ];

        for (const col of prColumns) {
            const [check] = await pool.query(
                'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = "prayer_requests" AND COLUMN_NAME = ?',
                [dbName, col.name]
            );

            if (check.length === 0) {
                const query = `ALTER TABLE prayer_requests ADD COLUMN ${col.name} ${col.definition}`;
                await pool.query(query);
                console.log(`✅ Added column to prayer_requests: ${col.name}`);
            } else {
                console.log(`ℹ️ Column already exists in prayer_requests: ${col.name}`);
            }
        }

        console.log('✨ Forms tables updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating forms tables:', error.message);
        process.exit(1);
    }
};

updateFormsTables();
