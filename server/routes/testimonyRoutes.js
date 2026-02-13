const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonyController.js');

// Public routes
router.get('/', testimonyController.getApprovedTestimonies);
router.post('/', testimonyController.submitTestimony);

// Admin/Moderation routes (Should be protected in production)
router.get('/all', testimonyController.getAllTestimonies);
router.get('/:id', testimonyController.getTestimony);
router.put('/:id', testimonyController.updateTestimony);
router.delete('/:id', testimonyController.deleteTestimony);

module.exports = router;
