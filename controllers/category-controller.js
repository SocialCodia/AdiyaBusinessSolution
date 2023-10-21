const categoryService = require('../services/category-service');
const categoryValidation = require('../validations/category-validation');
const CategoryDto = require('../dtos/category-dto');
const ErrorHandler = require('../utils/error-handler');

class CategoryController {

    createCategory = async (req, res, next) => {
        const file = req.file;
        req.body.icon = file && file.filename;
        console.log(file);
        const body = await categoryValidation.createCategory.validateAsync(req.body);
        const data = await categoryService.createCategory(body);
        if (!data) return next(ErrorHandler.serverError('Failed To Create Category'));
        res.json({ success: true, message: 'Category Added', data: new CategoryDto(data) })
    }

    updateCategory = async (req, res, next) => {
        const file = req.file;
        req.body.icon = file && file.filename;
        const body = await categoryValidation.updateCategory.validateAsync(req.body);
        const data = await categoryService.updateCategory(body.id, body);
        if (!data.acknowledged) return next(ErrorHandler.serverError('Failed To Update Category'));
        res.json({ success: true, message: 'Category Update' })
    }

    findCategory = async (req, res, next) => {
        const { id } = req.params;
        const data = await categoryService.findCategory({ _id: id });
        if (!data) return next(ErrorHandler.notFound('No Category Found'));
        res.json({ success: true, message: 'Category Found', data: new CategoryDto(data) })
    }

    findCategories = async (req, res, next) => {
        let data = await categoryService.findCategories({});
        if (!data || data.length < 1) return next(ErrorHandler.notFound('No Category Found'));
        data = data.map((o) => new CategoryDto(o));
        res.json({ success: true, message: 'Categories Found', data })
    }

}

module.exports = new CategoryController();