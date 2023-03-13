const validator = require('../../../modules/validators/api/index');
const responseHelper = require('../resources/response');
const appleService = require('../services/appleService');

class appleController {
    async auth(req, res) {
        try {
            // await validator.appleToken(req.body);
            let tokenData = await appleService.auth(req.body);
            return responseHelper.success(res, '', tokenData);
        } catch (error) {
            return responseHelper.error(res, error.message || 'INTERNAL_SERVER_ERROR', error.code || 500);
        }
    }
}
module.exports = new appleController();