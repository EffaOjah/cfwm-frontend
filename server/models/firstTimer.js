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
            `INSERT INTO first_timers (id, full_name, phone, email, address, how_heard, wants_visit, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, full_name, phone, email, address, how_heard, wants_visit || false, 'Pending']
        );
        return id;
    },

    toggleStatus: async (id, status) => {
        await pool.query('UPDATE first_timers SET status = ? WHERE id = ?', [status, id]);
    },

    delete: async (id) => {
        await pool.query('DELETE FROM first_timers WHERE id = ?', [id]);
    }
};

module.exports = FirstTimer;
