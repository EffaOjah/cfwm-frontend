const express = require('express');
const router = express.Router();
const sermonController = require('../controllers/sermonController.js');

// Public routes
router.get('/', sermonController.getSermons);
router.get('/:id', sermonController.getSermon);

// Admin routes (Should be protected in production)
router.post('/', sermonController.createSermon);
router.put('/:id', sermonController.updateSermon);
router.delete('/:id', sermonController.deleteSermon);

module.exports = router;
