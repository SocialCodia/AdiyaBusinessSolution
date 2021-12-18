const vehicalInfoValidation = require("../validations/vehical-info-validation");
const vehicalInfoService = require('../services/vehical-info-service');
const ErrorHandler = require('../utils/error-handler');
const VehicalInfoDto = require("../dtos/vehical-info-dto");

class VehicalInfoController {

    createVehicalInfo = async (req, res, next) => {
        const body = await vehicalInfoValidation.createVehicalInfo.validateAsync(req.body);
        const data = await vehicalInfoService.createVehicalInfo(body);
        if (!data) return next(ErrorHandler.serverError('Failed To Create Vehical Info'));
        res.json({ success: true, message: 'Vehical Information Added', data });
    }

    findVehicalInfos = async (req, res, next) => {
        let data = await vehicalInfoService.findVehicalInfos({});
        if (!data) return next(ErrorHandler.notFound('No Information Found On Server'));
        data = data.map((o) => new VehicalInfoDto(o))
        res.json({ success: true, message: 'Vehical Information Found', data });
    }

}

module.exports = new VehicalInfoController();