const authController = require("../controllers/auth-controller");
const asyncMiddleware = require('../middlewares/async-middleware');
const { auth } = require('../middlewares/auth-middleware');
const router = require('express').Router();

router.post('/login', asyncMiddleware(authController.login));                   // Login
router.post('/google', asyncMiddleware(authController.google));                 // Google Login
router.post('/facebook', asyncMiddleware(authController.facebook));             // Facebook Login
router.post('/verify', asyncMiddleware(authController.verifyOtp));              // Verify Otp
router.get('/logout', auth, asyncMiddleware(authController.logout));            // Logout
router.get('/logouts', auth, asyncMiddleware(authController.logouts));          // Logout From All Device
router.get('/refresh', auth, asyncMiddleware(authController.refresh));          // Refresh Access Token

module.exports = router;