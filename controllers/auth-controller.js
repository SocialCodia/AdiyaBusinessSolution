const validator = require('validator');
const ErrorHandler = require('../utils/error-handler');
const userService = require('../services/user-service');
const otpService = require('../services/otp-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const authValidation = require('../validations/auth-validation');
// const socialAuthConfig = require('../configs/social-auth-config');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "318552458267-eobt7iks74e30tle8eub2jr0cv8qvpgm.apps.googleusercontent.com";
const { OAuth2Client } = require('google-auth-library');
const { response } = require('express');

class AuthController {

    login = async (req, res, next) => {
        const { mobile } = req.body;
        let isActive = true;
        let user = null;
        if (!mobile || mobile.length < 10 || mobile.length > 13) return next(ErrorHandler.badRequest("Invalid Mobile Number"));
        user = await userService.findUser({ mobile });
        if (!user) {
            isActive = false;
            user = await userService.createUser({ mobile });
        }
        if (!user.email || !user.name)
            isActive = false;
        const otp = otpService.generateOtp();
        await otpService.storeOtp(user._id, otp);
        // const isSent = await otpService.sendOtp("+91" + mobile, otp);
        // console.log(isSent)
        res.json({ success: true, message: 'Otp has been sent!', isActive, otp });
    }

    verifyOtp = async (req, res, next) => {
        const { name, email, otp, mobile } = req.body;
        if (!otp || !mobile) return next(ErrorHandler.badRequest());
        let user = await userService.findUser({ mobile });
        if (!user) return next(ErrorHandler.notFound('No Account Found'));
        const isValid = await otpService.verifyOtp(user._id, otp);
        if (isValid === 'INVALID') return next(ErrorHandler.badRequest('Invalid OTP'));
        if (isValid === 'EXPIRED') return next(ErrorHandler.badRequest('Otp has been Expired'));
        if (isValid === 'VALID') {
            if (!user.email || !user.name) {
                if (!name || !email) return next(ErrorHandler.badRequest('All Field Required'));
                user = await userService.findUserAndUpdate(user._id, { name, email });
            }
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                status: user.status,
                type: user.type
            }
            const { accessToken, refreshToken } = tokenService.generateToken(payload);
            await tokenService.storeRefreshToken(user._id, refreshToken);
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            });
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            res.json({ success: true, message: 'Login Successfull', user: new UserDto(user) })
        }
    }

    google = async (req, res, next) => {
        const client = new OAuth2Client("GOOGLE_CLIENT_ID");
        const { tokenId } = req.body;
        if (!tokenId) return next(ErrorHandler.badRequest());
        const resp = await client.verifyIdToken({ idToken: tokenId, audience: GOOGLE_CLIENT_ID });
        if (resp.payload) {
            const { name, email, picture: image } = resp.payload;
            let user = await userService.findUser({ email });
            if (!user) {
                user = await userService.createUser({ name, email, image })
            }
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                status: user.status,
                type: user.type
            }
            const { accessToken, refreshToken } = tokenService.generateToken(payload);
            await tokenService.storeRefreshToken(user._id, refreshToken);
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            });
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            res.json({ success: true, message: 'Login Successfull', user: new UserDto(user) })
        }
        else
            return next(ErrorHandler.serverError('Failed To Login'));
    }

    facebook = async (req, res, next) => {
        const body = await authValidation.facebook.validateAsync(req.body);
        const facebookUrl = `https://graph.facebook.com/v2.11/${userId}/?field=id,name,email&access_token=${accessToken}`;
        const facebook = await fetch(facebookUrl, { method: 'GET' })
        if (!facebook) return next(ErrorHandler.badRequest('Failed To Login'));
        const { name, email } = facebook;
        let user = await userService.findUser({ email });
        if (!user) {
            user = await userService.createUser({ name, email })
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            status: user.status,
            type: user.type
        }
        const { accessToken, refreshToken } = tokenService.generateToken(payload);
        await tokenService.storeRefreshToken(user._id, refreshToken);
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.json({ success: true, message: 'Login Successfull', user: new UserDto(user) })
    }


    logout = async (req, res, next) => {
        const { refreshToken } = req.cookies;
        const { id } = req.user;
        const response = await tokenService.removeRefreshToken(id, refreshToken);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return (response.modifiedCount === 1) ? res.json({ success: true, message: 'Logout Successfully' }) : next(ErrorHandler.unAuthorized());
    }

    logouts = async (req, res, next) => {
        const { id } = req.user;
        const response = await tokenService.removeRefreshTokens(id);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return (response.deletedCount === 1) ? res.json({ success: true, message: 'Logout Successfully From All Device' }) : next(ErrorHandler.unAuthorized());
    }

    refresh = async (req, res, next) => {
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        if (!refreshTokenFromCookie) return next(ErrorHandler.unAuthorized());
        const userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        const { id, email, name, mobile, status, type } = userData;
        const token = await tokenService.findRefreshToken(id, refreshTokenFromCookie);
        if (!token) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(401).json({ success: false, message: 'Unauthorized Access' })
        }
        const user = await userService.findUser({ email });
        if (user.status != 'active') return next(ErrorHandler.unAuthorized('There is a problem with your account, Please contact to the admin'));
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
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.json({ success: true, message: 'Secure access has been granted', user: new UserDto(user) })
    }

}

module.exports = new AuthController;