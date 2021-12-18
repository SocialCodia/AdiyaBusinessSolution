const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

class CategoryValidation {

    createCategory = Joi.object({
        name: Joi.string().required().min(3).max(20),
        icon: Joi.string().required(),
    })

    updateCategory = Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().optional().min(3).max(20),
        icon: Joi.string().optional(),
    })

}

module.exports = new CategoryValidation();