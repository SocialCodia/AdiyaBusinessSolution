const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

class GarageValidation {

    createGarage = Joi.object({
        vendorId: Joi.objectId().required(),
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().required(),
        mobile: Joi.string().required(),
        description: Joi.string().optional(),
        images: Joi.array().required(),
        address: Joi.string().required().min(5).max(100)
    })

}

module.exports = new GarageValidation();