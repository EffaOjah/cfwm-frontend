const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController.js');

router.post('/subscribe', newsletterController.subscribe);
router.get('/subscribers', newsletterController.getSubscribers);
router.post('/unsubscribe', newsletterController.unsubscribe);
router.delete('/subscriber/:id', newsletterController.remove);

module.exports = router;
