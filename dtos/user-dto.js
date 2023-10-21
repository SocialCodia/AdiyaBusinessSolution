const BASE_URL = process.env.BASE_URL || 'http://localhost:8000/';

class UserDto {
    id;
    name;
    email;
    mobile;
    image;
    type;
    constructor(user) {
        this.id = user._id,
            this.name = user.name,
            this.email = user.email,
            this.mobile = user.mobile,
            this.image = user.image.includes('googleusercontent.com') ? user.image : `${BASE_URL}storage/images/profile/${user.image}`,
            this.type = user.type
    }
}

module.exports = UserDto;