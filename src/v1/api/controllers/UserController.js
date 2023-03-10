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
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async eventList(req, res) {
    try {
      let user = await UserService.eventList(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async addEvent(req, res) {
    try {
      let user = await UserService.addEvent(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async allEventList(req, res) {
    try {
      let user = await UserService.allEventList(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async patientDetail(req, res) {
    try {
      let user = await UserService.patientDetail(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async getEventByID(req, res) {
    try {
      let user = await UserService.getEventByID(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async editEvent(req, res) {
    try {
      let user = await UserService.editEvent(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async deleteEvent(req, res) {
    try {
      let user = await UserService.deleteEvent(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }
}
module.exports = new UserController();