const express = require('express');
const router = express.Router()
const Multer = require('multer')
const path = require('path')

const GlobalAuthClass = require('../../../modules/middleware/auth');
const UserController = require('../../api/controllers/UserController');

// register api
router.post('/sign-up', GlobalAuthClass.initialAuthenticate,UserController.signup);

// sign in api
router.post('/sign-in', GlobalAuthClass.initialAuthenticate,UserController.signin);

// logout api
router.post('/sign-out', GlobalAuthClass.passportAuthenticate,UserController.logout)

// detail api
router.post('/detail', GlobalAuthClass.passportAuthenticate,UserController.detail)

// verify email
router.get('/verify-email/:uuid', UserController.verifyMail);

// refresh token
router.post('/refresh-token',UserController.refreshToken)
// forgot password
router.post('/forgot-password',GlobalAuthClass.initialAuthenticate,UserController.forgotPassword)

// change password  
router.post('/change-password',GlobalAuthClass.passportAuthenticate,UserController.changePassword)

module.exports = router;
