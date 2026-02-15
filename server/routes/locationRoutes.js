const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController.js');

// Districts
router.get('/districts', locationController.getDistrictsWithBranches);
router.post('/districts', locationController.createDistrict);
router.put('/districts/:id', locationController.updateDistrict);
router.delete('/districts/:id', locationController.deleteDistrict);

// Branches
router.get('/branches', locationController.getBranches);
router.get('/headquarters', locationController.getHeadquarters);
router.post('/branches', locationController.createBranch);
router.put('/branches/:id', locationController.updateBranch);
router.delete('/branches/:id', locationController.deleteBranch);

module.exports = router;
