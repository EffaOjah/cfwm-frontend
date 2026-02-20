const express = require('express');
const router = express.Router();
const sermonController = require('../controllers/sermonController.js');
const { upload } = require('../services/cloudinary');

// Public routes
router.get('/', sermonController.getSermons);
router.get('/:id', sermonController.getSermon);

// Admin routes (Should be protected in production)
router.post('/', upload.single('thumbnail_url'), sermonController.createSermon);
router.put('/:id', upload.single('thumbnail_url'), sermonController.updateSermon);
router.delete('/:id', sermonController.deleteSermon);

module.exports = router;
