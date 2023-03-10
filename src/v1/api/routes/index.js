const express = require('express');
require('express-group-routes');
const UserController = require('../controllers/UserController');
const OutlookController = require('../controllers/OutlookController');
const TaskController = require('../controllers/taskController')
const router = express.Router()
const GlobalAuthClass = require('../../../modules/middleware/auth');

/* get google calendar list */
router.post('/calenderList', UserController.calenderList);
/* get google calendar event list */
router.post('/eventList', UserController.eventList);
/* add custom event list */
router.post('/addEvent', UserController.addEvent);
/* view all event list of user */
router.post('/allEventList', UserController.allEventList);
/* get all petient and doctor list */
router.post('/patientList', UserController.patientDetail);
/* get event detail */
router.post('/getEventByID', UserController.getEventByID);
/* update custom event */
router.post('/editEvent', UserController.editEvent);
/* delete custom event */
router.post('/deleteEvent', UserController.deleteEvent);

/* outlook calendar apis */
router.group('/outlook',(router) => {
    /* generate outlook user access_token */
    router.post('/get-access-token', OutlookController.getAccessToken);
    /* get outlook user access refresh token */
    router.post('/refresh-token', OutlookController.getRefreshToken);
    /* get outlook user calender list */
    router.post('/get-calendar-list', GlobalAuthClass.validateOutlookToken,OutlookController.getCalenderList);
    /* get outlook user calender event list */
    router.post('/get-calendar-events', GlobalAuthClass.validateOutlookToken,OutlookController.getCalenderEvents);
})

router.group('/todotask', (todotask) => {
  todotask.post('/createTask', [TaskController.createTask]);
  todotask.post('/getTaskById', [TaskController.getTaskById]);
  todotask.post('/taskList', [TaskController.taskList]);
  todotask.post('/deletetask', [TaskController.deletetask]);
  todotask.post('/editTask', [TaskController.editTask]);
})
module.exports = router
