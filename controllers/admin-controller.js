const userService = require("../services/user-service")
const UserDto = require('../dtos/user-dto');
const ErrorHandler = require("../utils/error-handler");
const mongoose = require('mongoose');
const vehicalInfoService = require("../services/vehical-info-service");
const VehicalInfoDto = require('../dtos/vehical-info-dto');
const userValidation = require("../validations/user-validation");

class AdminController {

    users = async (req, res, next) => {
        const type = req.path.split('/').pop().slice(0, -1).toLowerCase();
        const users = await userService.findUsers({ type });
        if (!users || users.length < 1) return next(ErrorHandler.notFound(`No ${type.charAt(0).toUpperCase() + type.slice(1)} Found`));
        const data = users.map((user) => new UserDto(user));
        res.json({
            success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)}s List Found`, data
        })
    }

    user = async (req, res, next) => {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) return next(ErrorHandler.badRequest('Invalid User Id'));
        const user = await userService.findUser({ _id: id })
        if (!user) return next(ErrorHandler.notFound('No User Found'));
        const data = new UserDto(user);
        res.json({ success: true, message: 'User Found', data });
    }

    createUser = async (req, res, next) => {

        const body = await userValidation.createUser.validateAsync(req.body);
        const file = req.file;
        const image = file && file.filename;
        const userResp = await userService.createUser(body);
        if (!userResp) return next(ErrorHandler.serverError(`Failed To Add ${type.charAt(0).toUpperCase() + type.slice(1)}`));
        const data = new UserDto(userResp);
        res.json({ success: true, message: `User Has Been Added ${type.charAt(0).toUpperCase() + type.slice(1)}`, data });
    }

    updateUser = async (req, res, next) => {
        const file = req.file;
        const filename = file && file.filename;
        let { id, name, email, mobile, type, status } = req.body;
        if (!id) return next(ErrorHandler.badRequest('User Id Required'));
        if (!mongoose.isValidObjectId(id)) return next(ErrorHandler.badRequest('Invalid User Is Id'));
        const user = {
            name, email, mobile, type, status, image: filename
        }
        const userResp = await userService.updateUser(id, user);
        if (!userResp) return next(ErrorHandler.serverError('Failed To Update Account'));
        if (!userResp.matchedCount) return next(ErrorHandler.notFound('No User Found'));
        res.json({ success: true, message: 'Account Updated' });
    }


    // findGarage = async (req, res, next) => {
    //     const { id: vendorId } = req.user;
    //     const garage = await garageService.findGarage({ vendorId });
    //     console.log(garage);
    //     res.json({ success: true, message: 'Garage Found', data: new GarageDto(garage) });
    // }

}

module.exports = new AdminController();