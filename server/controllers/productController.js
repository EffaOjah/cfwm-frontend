const Product = require('../models/product.js');

const productController = {
    getProducts: async (req, res) => {
        try {
            const { category } = req.query;
            const products = await Product.getAll(category);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.getById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const id = await Product.create(req.body);
            res.status(201).json({ message: 'Product created successfully', id });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Title already exists. Please use a unique title.' });
            }
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            await Product.update(req.params.id, req.body);
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Title already exists. Please use a unique title.' });
            }
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.delete(req.params.id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    }
};

module.exports = productController;
