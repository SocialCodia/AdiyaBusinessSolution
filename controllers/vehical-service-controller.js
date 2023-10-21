const vehicalServiceService = require('../services/vehical-service-service');
const ErrorHandler = require('../utils/error-handler');
const vehicalServiceValidation = require("../validations/vehical-service-validation");
const VehicalServiceDto = require('../dtos/vehical-service-dto');

class VehicalServiceController {

    createVehicalService = async (req, res, next) => {
        const file = req.file;
        req.body.icon = file && file.filename;
        const body = await vehicalServiceValidation.createVehicalService.validateAsync(req.body);
        const data = await vehicalServiceService.createVehicalService(body);
        if (!data) return next(ErrorHandler.serverError('Failed To Create Vehical Info'));
        res.json({ success: true, message: 'Vehical Service Added', data: new VehicalServiceDto(data) });
    }

    findVehicalServices = async (req, res, next) => {
        let data = await vehicalServiceService.findVehicalServices({});
        if (!data) return next(ErrorHandler.notFound('No Information Found On Server'));
        data = data.map((o) => new VehicalServiceDto(o))
        res.json({ success: true, message: 'Vehical Information Found', data });
    }

    findVehicalService = async (req, res, next) => {
        const { type } = req.params;
        let data = await vehicalServiceService.findVehicalService({ type });
        if (!data || data.length < 1) return next(ErrorHandler.serverError('No Serivce Information Found'));
        data = data.map(o => new VehicalServiceDto(o))
        res.json({ success: true, message: 'Service Information Found', data });
    }

}

module.exports = new VehicalServiceController();