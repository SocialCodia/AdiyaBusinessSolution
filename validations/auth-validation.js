const Joi = require('@hapi/joi');

class AuthValidation {

    facebook = Joi.object({
        userId: Joi.string().required(),
        accessToken: Joi.string().required()
    })

}

module.exports = new AuthValidation();
