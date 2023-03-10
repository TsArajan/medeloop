const express = require('express');
require('express-group-routes');
const UserController = require('../controllers/UserController')
const TaskController = require('../controllers/taskController')
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

router.group('/todotask', (todotask) => {
  todotask.post('/createTask', [TaskController.createTask]);
  todotask.post('/getTaskById', [TaskController.getTaskById]);
  todotask.post('/taskList', [TaskController.taskList]);
  todotask.post('/deletetask', [TaskController.deletetask]);
  todotask.post('/editTask', [TaskController.editTask]);
})
module.exports = router