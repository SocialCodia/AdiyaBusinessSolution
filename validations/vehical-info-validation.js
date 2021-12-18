const Joi = require('@hapi/joi');

class VehicalInfoValidation {

    createVehicalInfo = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        type: Joi.string().required()
    });

}

module.exports = new VehicalInfoValidation();