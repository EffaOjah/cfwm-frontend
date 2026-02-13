const { pool } = require('../config/database.js');
const crypto = require('crypto');

const Event = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM events ORDER BY event_date ASC');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (eventData) => {
        const id = crypto.randomUUID();
        const { title, description, event_date, event_time, location, image_url } = eventData;
        await pool.query(
            'INSERT INTO events (id, title, description, event_date, event_time, location, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, title, description, event_date, event_time, location, image_url]
        );
        return id;
    },

    update: async (id, eventData) => {
        const { title, description, event_date, event_time, location, image_url } = eventData;
        await pool.query(
            'UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, image_url = ? WHERE id = ?',
            [title, description, event_date, event_time, location, image_url, id]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM events WHERE id = ?', [id]);
    }
};

module.exports = Event;
