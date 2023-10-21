const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

class AddressValidation {

    createAddress = Joi.object({
        userId: Joi.string().required(),
        building: Joi.string().required().min(3).max(70),
        street: Joi.string().required().min(3).max(70),
        locality: Joi.string().required().min(3).max(30),
        city: Joi.string().required().min(3).max(30),
        state: Joi.string().required().min(3).max(30),
        pin: Joi.string().required().min(3).max(7),
        country: Joi.string().optional(),
    })

    updateAddress = Joi.object({
        id: Joi.objectId().required(),
        building: Joi.string().optional().min(3).max(70),
        street: Joi.string().optional().min(3).max(70),
        locality: Joi.string().optional().min(3).max(30),
        city: Joi.string().optional().min(3).max(30),
        state: Joi.string().optional().min(3).max(30),
        pin: Joi.string().optional().min(3).max(7),
        country: Joi.string().optional(),
    })


}

module.exports = new AddressValidation();