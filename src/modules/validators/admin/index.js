const joiBase = require('joi');
const joiDate = require("@joi/date");
const joi = joiBase.extend(joiDate);
const custMessages = require('../../../../config/constant.json'); 
const promise = require('bluebird');
const lang = 'en';

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
};
class Validator {
    async validateHeaders(headers){
        try{
            const schema = joi.object({
                language: joi.string().required(),
                authorization: joi.string().required(),
                device_token: joi.string().optional(),
                device_id: headers.app_version ? joi.string().required() : joi.string().optional(),
                device_type: headers.app_version ? joi.number().required() : joi.string().optional(),
                web_app_version : headers.web_app_version ? joi.any().required() : joi.any().optional(),
                app_version: headers.app_version ? joi.any().required() :  joi.any().optional(),
                os: joi.any().required(),
                timezone:headers.app_version ? joi.any().required() :  joi.any().optional(),
            }).unknown();
            return await schema.validateAsync(body, options);
        }catch(error){
            console.log(error);
            error.message = error.details[0].message;
            error.code = 400;
            return promise.reject(error);
        }
    }
}


module.exports = new Validator();