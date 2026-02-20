const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');
const { upload } = require('../services/cloudinary.js');

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', upload.single('image_url'), eventController.createEvent);
router.put('/:id', upload.single('image_url'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
