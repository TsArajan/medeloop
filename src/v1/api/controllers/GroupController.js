const validator = require('../../../modules/validators/api/index');
const responseHelper = require('../../api/resources/response');
const ChatGroupService = require('../services/ChatGroupService');

class GroupController {
  /*------------------------
     list of chat groups
  -------------------------*/
  async index(req, res) {
    try {
      let list = await ChatGroupService.index();
      return responseHelper.success(res, 'chat_group_list',list);
    } catch (error) {
      console.log('error ====',error)
      return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
    }
  }
  /*------------------------
    create or udate chat groups
  -------------------------*/
  async createOrUpdate(req, res) {
    try {
      await validator.groupCreateOrUpdate(req.body);
      let chatGroup = await ChatGroupService.create(req.body);
      return responseHelper.success(res, 'chat_group_save', chatGroup);
    } catch (error) {
      return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
    }
  }
  /*------------------------
    delete chat groups
  -------------------------*/
  async delete(req, res) {
    try {
      await validator.groupDelete(req.body);
      await ChatGroupService.delete(req.body);
      return responseHelper.success(res, 'group_deleted',{});
    } catch (error) {
      console.log('error ========>',error);
      return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
    }
  }
}
module.exports = new GroupController();