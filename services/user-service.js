const UserModel = require('../models/user-model');

class UserService {

    findUser = async (filter) => await UserModel.findOne(filter);

    findUsers = async (filter) => await UserModel.find(filter);

    createUser = async (user) => await UserModel.create(user);

    updateUser = async (_id, user) => await UserModel.updateOne({ _id }, user);

    findUserAndUpdate = async (id, user) => await UserModel.findOneAndUpdate({ _id: id }, user, { new: true });


}

module.exports = new UserService();