const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController.js');

// Public routes
router.post('/first-timer', formController.submitFirstTimer);
router.post('/prayer-request', formController.submitPrayerRequest);

// Admin routes (Should be protected in production)
router.get('/first-timers', formController.getFirstTimers);
router.patch('/first-timers/:id/status', formController.toggleFirstTimerStatus);
router.delete('/first-timers/:id', formController.deleteFirstTimer);
router.get('/prayer-requests', formController.getPrayerRequests);
router.patch('/prayer-requests/:id/status', formController.togglePrayerRequestStatus);
router.delete('/prayer-requests/:id', formController.deletePrayerRequest);

module.exports = router;
