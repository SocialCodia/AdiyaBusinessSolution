const tokenService = require('../services/token-service');
const userService = require('../services/user-service');
const ErrorHandler = require('../utils/error-handler');
const { TokenExpiredError } = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const { accessToken: accessTokenFromCookie, refreshToken: refreshTokenFromCookie } = req.cookies;
    try {
        if (!accessTokenFromCookie)
            return next(ErrorHandler.unAuthorized())
        const userData = tokenService.verifyAccessToken(accessTokenFromCookie);
        if (!userData)
            throw new Error(ErrorHandler.unAuthorized());
        req.user = userData;
    }
    catch (e) {
        console.log('==================TOKEN ERROR=================');
        if (e instanceof TokenExpiredError) {
            console.log('================TOKEN EXPIRED=================')
            console.log('=============GENERATING NEW TOEKN=============');
            if (!refreshTokenFromCookie) return next(ErrorHandler.unAuthorized());
            const userData = tokenService.verifyRefreshToken(refreshTokenFromCookie);
            const { id, email, name, mobile, status, type } = userData;
            const token = await tokenService.findRefreshToken(id, refreshTokenFromCookie);
            if (!token) return next(ErrorHandler.unAuthorized());
            const payload = {
                id,
                name,
                email,
                mobile,
                status,
                type
            }
            const { accessToken, refreshToken } = tokenService.generateToken(payload);
            await tokenService.updateRefreshToken(id, refreshTokenFromCookie, refreshToken);
            const user = await userService.findUser({ email });
            if (user.status != 'active') return next(ErrorHandler.unAuthorized('There is a problem with your account, Please contact to the admin'));
            req.user = user;
            req.cookies.accessToken = accessToken;
            req.cookies.refreshToken = refreshToken;
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            console.log('=========TOKEN GENERATED SUCCESSFULLY=========');
            return next();
        }
        else
            return next(ErrorHandler.unAuthorized());
    }
    next();
}

const authRole = (role) => {
    return (req, res, next) => {
        if (req.user.type != role)
            return next(ErrorHandler.notAllowed());
        next();
    }
}


module.exports = {
    auth,
    authRole
}