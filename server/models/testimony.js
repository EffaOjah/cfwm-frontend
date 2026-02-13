const { pool } = require('../config/database.js');
const crypto = require('crypto');

const Testimony = {
    getAllApproved: async () => {
        const [rows] = await pool.query('SELECT * FROM testimonies WHERE status = "approved" ORDER BY created_at DESC');
        return rows;
    },

    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM testimonies ORDER BY created_at DESC');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM testimonies WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (testimonyData) => {
        const id = crypto.randomUUID();
        const { name, content, category } = testimonyData;
        await pool.query(
            'INSERT INTO testimonies (id, name, content, category) VALUES (?, ?, ?, ?)',
            [id, name, content, category]
        );
        return id;
    },

    update: async (id, testimonyData) => {
        const { name, content, category, status } = testimonyData;
        await pool.query(
            'UPDATE testimonies SET name = ?, content = ?, category = ?, status = ? WHERE id = ?',
            [name, content, category, status, id]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM testimonies WHERE id = ?', [id]);
    }
};

module.exports = Testimony;
