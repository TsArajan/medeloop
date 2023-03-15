const UserService = require('../services/UserService');
const responseHelper = require('../../api/resources/response');
const messages = require('../../../../config/constant.json');
const passport = require('passport');
require('../../../../config/passport')(passport);

class UserController {
  async getMessages(headers) {
    if (!headers.language) {
      return messages['en'];
    } else {
      return messages[headers.language];
    }
  }

  // get calender list from authenticate email
  async calenderList(req, res) {
    try {
      let user = await UserService.calenderList(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  // get eventlist from perticular calendar id and store in database
  async eventList(req, res) {
    try {
      let user = await UserService.eventList(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  //created custom event on medeloop calendar
  async addEvent(req, res) {
    try {
      let user = await UserService.addEvent(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  //list all event for specific user
  async allEventList(req, res) {
    try {
      let user = await UserService.allEventList(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  // get patient and doctor list
  async patientDetail(req, res) {
    try {
      let user = await UserService.patientDetail(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  //get event details by id
  async getEventByID(req, res) {
    try {
      let user = await UserService.getEventByID(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error ====   =>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  //edit custom event 
  async editEvent(req, res) {
    try {
      let user = await UserService.editEvent(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  //delete custom event
  async deleteEvent(req, res) {
    try {
      let user = await UserService.deleteEvent(req.body)
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }
}
module.exports = new UserController();