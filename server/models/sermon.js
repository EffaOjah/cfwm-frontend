const { pool } = require('../config/database.js');
const crypto = require('crypto');

const Sermon = {
    getAll: async (type = null) => {
        let sql = 'SELECT * FROM sermons';
        const params = [];

        if (type) {
            sql += ' WHERE type = ?';
            params.push(type);
        }

        sql += ' ORDER BY sermon_date DESC';
        const [rows] = await pool.query(sql, params);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM sermons WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (sermonData) => {
        const id = crypto.randomUUID();
        const {
            title, speaker, series, description, sermon_date,
            duration, type, video_url, audio_url, thumbnail_url
        } = sermonData;

        await pool.query(
            `INSERT INTO sermons (
                id, title, speaker, series, description, sermon_date, 
                duration, type, video_url, audio_url, thumbnail_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id, title, speaker, series, description, sermon_date,
                duration, type, video_url, audio_url, thumbnail_url
            ]
        );
        return id;
    },

    update: async (id, sermonData) => {
        const {
            title, speaker, series, description, sermon_date,
            duration, type, video_url, audio_url, thumbnail_url
        } = sermonData;

        await pool.query(
            `UPDATE sermons SET 
                title = ?, speaker = ?, series = ?, description = ?, sermon_date = ?, 
                duration = ?, type = ?, video_url = ?, audio_url = ?, thumbnail_url = ?
            WHERE id = ?`,
            [
                title, speaker, series, description, sermon_date,
                duration, type, video_url, audio_url, thumbnail_url, id
            ]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM sermons WHERE id = ?', [id]);
    }
};

module.exports = Sermon;
