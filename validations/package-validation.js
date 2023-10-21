const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

class PackageValidation {

    createPackage = Joi.object({
        categoryId: Joi.objectId().required(),
        name: Joi.string().required(),
        time: Joi.string().required(),
        duration: Joi.number().required(),
        type: Joi.string().valid('minute', 'hour', 'day', 'month', 'year').required(),
        note: Joi.string().required(),
        recommended: Joi.boolean().required(),
        includes: Joi.array().required()
    })

}

module.exports = new PackageValidation();