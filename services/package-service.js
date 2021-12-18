const ModelPackage = require('../models/package-model');

class PackageService {

    createPackage = async data => await ModelPackage.create(data);

    findPackage = async filter => await ModelPackage.findOne(filter);

    findPackages = async filter => await ModelPackage.find(filter);

}

module.exports = new PackageService();