const packageValidation = require("../validations/package-validation");
const packageService = require('../services/package-service');
const ErrorHandler = require("../utils/error-handler");
const PackageDto = require("../dtos/package-dto");

class PackageController {

    createPackage = async (req, res, next) => {
        const body = await packageValidation.createPackage.validateAsync(req.body);
        body.warranty = {
            duration: body.duration,
            type: body.type,
            note: body.note
        }
        delete body['type'];
        delete body['note'];
        delete body['duration'];
        const data = await packageService.createPackage(body);
        if (!data) return next(ErrorHandler.serverError('Failed To Add Package'));
        res.json({ success: true, message: 'Package Added', data: new PackageDto(data) });
    }

    findPackages = async (req, res, next) => {
        const path = req.path.split('/', "3").pop();
        const { id } = req.params;
        let type = null;
        if (path === 'category')
            type = { categoryId: id }
        const packages = await packageService.findPackages(type);
        if (!packages || packages.length < 1) return next(ErrorHandler.notFound('No Package Found'));
        const data = packages.map((o) => new PackageDto(o));
        res.json({ success: true, message: 'Package Found', data });
    }

    findPackage = async (req, res, next) => {
        const { id } = req.params;
        const data = await packageService.findPackage({ _id: id });
        if (!data) return next(ErrorHandler.notFound('No Package Found'));
        res.json({ success: true, message: 'Package Found', data: new PackageDto(data) });
    }

}
module.exports = new PackageController();