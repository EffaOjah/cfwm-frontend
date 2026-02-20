const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { upload } = require('../services/cloudinary.js');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Admin routes (Should be protected in production)
router.post('/', upload.single('image_url'), productController.createProduct);
router.put('/:id', upload.single('image_url'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
