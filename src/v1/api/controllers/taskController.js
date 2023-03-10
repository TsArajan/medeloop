const validator = require('../../../modules/validators/api/index')
const TaskService = require('../services/taskService')
const responseHelper = require('../resources/response');
const messages = require('../../../../config/constant.json');
const { sequelize, UserDeviceToken } = require('../../../data/models');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const path = require('path');
require('../../../../config/passport')(passport);

class TaskController {
  // create to do task
  async createTask(req, res) {
    try {
      let user = await TaskService.createTask(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async getTaskById(req, res) {
    try {
      let user = await TaskService.getTaskById(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async taskList(req, res) {
    try {
      let user = await TaskService.taskList(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async deletetask(req, res) {
    try {
      let user = await TaskService.deletetask(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }

  async editTask(req, res) {
    try {
      let user = await TaskService.editTask(req.body)
      // console.log('user ========>', user);
      return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    } catch (error) {
      console.log('error =====>', error);
      return responseHelper.error(res, error.message || '', error.code || 500);
    }
  }
}
module.exports = new TaskController();