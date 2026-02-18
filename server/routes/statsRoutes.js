const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController.js');

router.get('/overview', statsController.getDashboardOverview);

module.exports = router;
