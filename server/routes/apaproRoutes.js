const express = require('express');
const router = express.Router();
const apaproController = require('../controllers/apaproController');

// Public routes
router.get('/', apaproController.getPublishedDevotionals);
router.get('/date/:date', apaproController.getDevotionalByDate);

// Admin routes
router.get('/all', apaproController.getAllDevotionals);
router.post('/', apaproController.createDevotional);
router.put('/:id', apaproController.updateDevotional);
router.delete('/:id', apaproController.deleteDevotional);

module.exports = router;
