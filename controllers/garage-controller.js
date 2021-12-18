const garageService = require("../services/garage-service");
const garageValidation = require("../validations/garage-validation");
const userService = require('../services/user-service');
const ErrorHandler = require('../utils/error-handler');
const GarageDto = require("../dtos/garage-dto");
class GarageConroller {

    createGarage = async (req, res, next) => {
        req.body.images = req.files && req.files.map((o) => {
            const image = o.filename;
            return { image };
        });
        const { user } = req;
        if (user.type !== 'admin')
            req.body.vendorId = user.id;
        const body = await garageValidation.createGarage.validateAsync(req.body);
        const dbUser = await userService.findUser({ _id: body.vendorId });
        if (dbUser.type !== 'vendor') return next(ErrorHandler.badRequest(`Not A Vendor`));
        const dbGarage = await garageService.findGarage({ vendorId: body.vendorId });
        if (dbGarage) return next(ErrorHandler.badRequest(`${dbUser.name} is already Managing ${dbGarage.name} Garage`));
        const garage = await garageService.createGarage(body);
        if (!garage) return next(ErrorHandler.serverError(`Failed To Add Garage`));
        res.json({ success: true, message: 'Garage Added Successfully', data: new GarageDto(garage) });
    }

    findGarage = async (req, res, next) => {
        const { user } = req;
        const { id: garageId } = req.params;
        const { id: vendorId } = user;
        let type = null;
        if (user.type === 'admin')
            type = { _id: garageId }
        else if (user.type === 'vendor')
            type = { vendorId }
        else
            type = { _id: garageId, status: 'active' }
        const garage = await garageService.findGarage(type);
        res.json({ success: true, message: 'Garage Found', data: new GarageDto(garage) });
    }


    findGarages = async (req, res, next) => {
        const { status: path } = req.params;
        const { user } = req;
        let status = path === 'pending' || path === 'active' || path === 'banned' ? path : '';
        if (user.type === 'user')
            status = 'active';
        const garage = await garageService.findGarages(status ? { status } : {});
        if (!garage || garage.length < 1) return next(ErrorHandler.notFound(`No ${status && status.charAt().toUpperCase() + status.slice(1)} Garage Found`));
        const data = garage.map((o) => new GarageDto(o));
        console.log(status)
        res.json({ success: true, message: `${status ? status.charAt().toUpperCase() + status.slice(1) : 'All'} Garage Found`, data });
    }

}

module.exports = new GarageConroller();