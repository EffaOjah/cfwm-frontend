const { pool } = require('../config/database.js');
const crypto = require('crypto');

const FirstTimer = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM first_timers ORDER BY created_at DESC');
        return rows;
    },

    create: async (data) => {
        const id = crypto.randomUUID();
        const { full_name, phone, email, address, how_heard, wants_visit } = data;
        await pool.query(
            `INSERT INTO first_timers (id, full_name, phone, email, address, how_heard, wants_visit) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, full_name, phone, email, address, how_heard, wants_visit || false]
        );
        return id;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM first_timers WHERE id = ?', [id]);
    }
};

module.exports = FirstTimer;
