const crypto = require('crypto');
const OtpModel = require('../models/otp-model');

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC3c1ca11155367d96e22c5efd69ae4579';
const authToken = process.env.TWILIO_AUTH_TOKEN || '8f978652c451e17cc0c437d5928b7259';

const twilio = require('twilio')(accountSid, authToken, {
    lazyLoading: true
})

class OtpService {

    generateOtp = () => crypto.randomInt(100000, 999999);

    storeOtp = async (userId, otp) => {
        await this.removeOtp(userId);
        return await OtpModel.create({ userId, otp });
    }

    removeOtp = async userId => await OtpModel.deleteOne({ userId });

    verifyOtp = async (userId, otp) => {
        const otpData = await OtpModel.findOne({ userId, otp });
        if (otpData) {
            const now = new Date(1635966633159);
            // await this.removeOtp(userId);
            if (now < otpData.expire) {
                return 'VALID';
            }
            else
                return 'EXPIRED'
        }
        else
            return 'INVALID'
    }

    sendOtp = async (phone, otp) => {
        return await twilio.messages.create({
            to: phone,
            from: '+14792655367',
            body: `Your Adiya Business Solution OTP is ${otp}`
        });
    }


}

module.exports = new OtpService();