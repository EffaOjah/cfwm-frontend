const { pool } = require('../config/database.js');
const crypto = require('crypto');

const Product = {
    getAll: async (category = null, search = '') => {
        let sql = 'SELECT * FROM products';
        const params = [];
        const conditions = [];

        if (category && category !== 'all') {
            conditions.push('category = ?');
            params.push(category);
        }

        if (search) {
            conditions.push('(title LIKE ? OR author LIKE ? OR description LIKE ?)');
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ' ORDER BY created_at DESC';
        const [rows] = await pool.query(sql, params);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (productData) => {
        const id = crypto.randomUUID();
        const {
            title, author, description, price, category, status,
            image_url, file_url, stock_quantity, is_digital, rating
        } = productData;

        await pool.query(
            `INSERT INTO products (
                id, title, author, description, price, category, status,
                image_url, file_url, stock_quantity, is_digital, rating
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id, title, author, description, price, category, status || 'published',
                image_url, file_url, stock_quantity || 0,
                is_digital !== undefined ? is_digital : true,
                rating || 5.00
            ]
        );
        return id;
    },

    update: async (id, productData) => {
        const {
            title, author, description, price, category, status,
            image_url, file_url, stock_quantity, is_digital, rating
        } = productData;

        await pool.query(
            `UPDATE products SET 
                title = ?, author = ?, description = ?, price = ?, category = ?, status = ?,
                image_url = ?, file_url = ?, stock_quantity = ?, is_digital = ?, rating = ?
            WHERE id = ?`,
            [
                title, author, description, price, category, status,
                image_url, file_url, stock_quantity, is_digital, rating, id
            ]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
    }
};

module.exports = Product;
