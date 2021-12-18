const Joi = require('@hapi/joi');

class VehicalServiceValidation {

    createVehicalService = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        icon: Joi.string().required(),
        type: Joi.string().required().valid('GeneralService', 'CustomRepairs', 'Denting & Painting', 'AC service & Repairs', 'Body Fittings', 'Wash & Detailing', 'Battery Care', 'Wheel Care', 'Insurance & Claims', 'Insurance & Claims', 'Independent inspections by MG')
    });

}

module.exports = new VehicalServiceValidation();