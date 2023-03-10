const express = require('express');
const UserController = require('../controllers/UserController')
const router = express.Router()
const GlobalAuthClass = require('../../../modules/middleware/auth');

router.post('/calenderList', UserController.calenderList);
router.post('/eventList', UserController.eventList);
router.post('/addEvent', UserController.addEvent);
router.post('/allEventList', UserController.allEventList);
router.post('/patientList', UserController.patientDetail);
router.post('/getEventByID', UserController.getEventByID);
router.post('/editEvent', UserController.editEvent);
router.post('/deleteEvent', UserController.deleteEvent);
module.exports = router