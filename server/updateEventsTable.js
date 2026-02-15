const { pool } = require('./config/database.js');
require('dotenv').config();

const updateEventsTable = async () => {
    try {
        console.log('🚀 Starting events table update...');

        const dbName = process.env.DB_NAME || 'cfwm_db';

        // Define columns to add
        const columns = [
            { name: 'category', definition: 'VARCHAR(100) DEFAULT "Church Event"' },
            { name: 'subtitle', definition: 'VARCHAR(255)' },
            { name: 'highlights', definition: 'TEXT' },
            { name: 'organizer', definition: 'VARCHAR(255) DEFAULT "CFWM"' },
            { name: 'status', definition: 'ENUM("draft", "published") DEFAULT "published"' }
        ];

        for (const col of columns) {
            // Check if column exists
            const [check] = await pool.query(
                'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = "events" AND COLUMN_NAME = ?',
                [dbName, col.name]
            );

            if (check.length === 0) {
                const query = `ALTER TABLE events ADD COLUMN ${col.name} ${col.definition}`;
                await pool.query(query);
                console.log(`✅ Added column: ${col.name}`);
            } else {
                console.log(`ℹ️ Column already exists: ${col.name}`);
            }
        }

        console.log('✨ Events table updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating events table:', error.message);
        process.exit(1);
    }
};

updateEventsTable();
