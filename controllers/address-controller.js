const ErrorHandler = require('../utils/error-handler');
const addressValidation = require('../validations/address-validation');
const addressService = require('../services/address-service');
const AddressDto = require('../dtos/address-dto');


class AddressController {

    createAddress = async (req, res, next) => {
        req.body.userId = req.user.id;
        const body = await addressValidation.createAddress.validateAsync(req.body);
        const data = await addressService.createAddress(body);
        if (!data) return next(ErrorHandler.badRequest('Failed To Add The Address'));
        res.json({ success: true, message: 'Address Added', data: new AddressDto(data) })
    }

    updateAddress = async (req, res, next) => {
        const body = await addressValidation.updateAddress.validateAsync(req.body);
        const { id } = body;
        const { id: userId } = req.user;
        const data = await addressService.updateAddress(userId, id, body);
        if (!data) return next(ErrorHandler.badRequest('Failed To Update Address'));
        if (!data.matchedCount) return next(ErrorHandler.notFound('No Addresss Found'));
        res.json({ success: true, message: 'Address Updated' })
    }

    findAddress = async (req, res, next) => {
        const { id: userId } = req.user;
        const data = await addressService.findAddress({ userId });
        if (!data) return next(ErrorHandler.notFound('No Address Found'));
        res.json({ success: true, message: 'Address Found', data: new AddressDto(data) })
    }

}

module.exports = new AddressController();