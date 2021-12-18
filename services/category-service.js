const CategoryModel = require("../models/category-model");

class CategoryService {

    createCategory = async data => await CategoryModel.create(data);

    updateCategory = async (_id, data) => await CategoryModel.updateOne({ _id }, data);

    findCategory = async filter => await CategoryModel.findOne(filter);

    findCategories = async filter => await CategoryModel.find(filter);

}

module.exports = new CategoryService();