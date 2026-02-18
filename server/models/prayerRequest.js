const { pool } = require('../config/database.js');
const crypto = require('crypto');

const PrayerRequest = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM prayer_requests ORDER BY created_at DESC');
        return rows;
    },

    create: async (data) => {
        const id = crypto.randomUUID();
        const { name, phone, topic, request_details, is_confidential } = data;
        await pool.query(
            `INSERT INTO prayer_requests (id, name, phone, topic, request_details, is_confidential, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, name, phone, topic, request_details, is_confidential || false, 'Pending']
        );
        return id;
    },

    toggleStatus: async (id, status) => {
        await pool.query('UPDATE prayer_requests SET status = ? WHERE id = ?', [status, id]);
    },

    delete: async (id) => {
        await pool.query('DELETE FROM prayer_requests WHERE id = ?', [id]);
    }
};

module.exports = PrayerRequest;
