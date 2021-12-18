const UserDto = require("../dtos/user-dto");
const userService = require("../services/user-service");

class UserController {

    profile = async (req, res, next) => {
        const { email } = req.user;
        const user = await userService.findUser({ email })
        const data = new UserDto(user);
        res.json({ success: true, message: 'Profile Found', data })
    }

    updateUser = async (req, res, next) => {
        const file = req.file;
        const filename = file && file.filename;
        const { id } = req.user;
        let { name } = req.body;
        const user = {
            name, image: filename
        }
        const userResp = await userService.updateUser(id, user);
        if (!userResp) return next(ErrorHandler.serverError('Failed To Update Account'));
        res.json({ success: true, message: 'Account Updated' });
    }

}
module.exports = new UserController();