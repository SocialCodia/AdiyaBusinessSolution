const Joi = require('@hapi/joi');

class UserValidation {

    createUser = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().lowercase(),
        mobile: Joi.string().min(10).max(13),
        image: Joi.string(),
        type: Joi.string().lowercase(),
        status: Joi.string()
    });

    updateUser = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().lowercase(),
        mobile: Joi.string().min(10).max(13),
        image: Joi.string().optional(),
        type: Joi.string().lowercase(),
        status: Joi.string().optional()
    })


}


module.exports = new UserValidation();