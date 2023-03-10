const validator = require('../../../modules/validators/api/index');
const responseHelper = require('../../api/resources/response');
const OutlookService = require('../services/OutlookService');

class OutlookController{
    /*------------------------
        get outlook user access
        token
        params code
    -------------------------*/
    async getAccessToken(req,res){
        try{
            await validator.outlookToken(req.body);
            let tokenData = await OutlookService.getAccessToken(req);
            return responseHelper.success(res,'',tokenData);
        }catch(error){
            return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
        }
    }
    /*------------------------
        get outlook user refresh
        token
        params refresh_token
    -------------------------*/
    async getRefreshToken(req,res){
        try{
            await validator.outlookRefreshToken(req.body);
            let tokenData = await OutlookService.getRefreshToken(req);
            return responseHelper.success(res,'',tokenData);
        }catch(error){
            return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
        }
    }
    /*------------------------
        get calender list
        params null
    -------------------------*/
    async getCalenderList(req,res){
        try{
            let calenderList = await OutlookService.getCalenderList(req.headers.authorization);
            return responseHelper.success(res,'',calenderList);
        }catch(error){
            return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
        }
    }
    /*------------------------
        get calender event list
        params calendat_id
    -------------------------*/
    async getCalenderEvents(req,res){
        try{
            await validator.validateCalenderEvent(req.body);
            req.body.email = req.body.email.trim();
            let calenderList = await OutlookService.getCalenderEvents(req.headers.authorization,req.body.calendar_id,req.body.email);
            return responseHelper.success(res,'',calenderList);
        }catch(error){
            console.log('error ====>',error);
            return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
        }
    }
}
module.exports = new OutlookController();