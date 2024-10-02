"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/account/user");
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_session_1 = __importDefault(require("express-session"));
const user_2 = require("../../postgres/account/user");
const hashPassword_1 = require("../../utils/hashPassword");
const user_3 = require("../../postgres/account/user");
const express_validator_1 = require("express-validator");
exports.forgotPassword = (0, express_1.Router)();
exports.forgotPassword.use((0, express_session_1.default)({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 10000 }
}));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "yeabsiraalemu@hotmail.com",
        pass: "@Ybxth3hotmailbro",
    },
    tls: {}
});
let sixDigitNumber;
let count = 0;
let countInterval;
exports.forgotPassword.post('/api/account/forget-password', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    clearInterval(countInterval);
    countInterval = setInterval(() => { count = 0; }, 60 * 60 * 1000);
    if (count < 3) {
        if (yield (0, user_1.userExists)(request.body)) {
            sixDigitNumber = Math.floor(100000 + Math.random() * 900000);
            const mail = {
                from: 'yeabsiraalemu@hotmail.com',
                to: request.body.email,
                subject: 'Reset Password',
                text: `Here is your verification code ${sixDigitNumber}`
            };
            transporter.sendMail(mail, function (error, info) {
                if (error) {
                    console.error('Email failed to send:', error);
                }
                else {
                    console.log('Email sent:', info.response);
                }
            });
            request.session.userInfo = { verificationCode: sixDigitNumber, email: request.body.email };
            count++;
            return response.status(201).send('Verify your email');
        }
        return response.status(401).send('Invalid email');
    }
    return response.status(429).send('Limit exceeded, try again in one hour');
}));
const verificationNumberMiddleware = (request, response, next) => {
    if (request.body.verificationCode === request.session.userInfo.verificationCode) {
        return next();
    }
    return response.status(403).send('Code does not match');
};
exports.forgotPassword.post('/api/account/verify', verificationNumberMiddleware, (request, response) => {
    request.session.user;
    response.sendStatus(200);
});
exports.forgotPassword.patch('/api/account/change-password', (0, express_validator_1.body)('newPassword').notEmpty().withMessage('Password can not be empty').isString().withMessage('Password must be a string').isLength({ min: 8 }).withMessage('Minimum 8 characters').matches(/^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(request);
    if (result.array().length)
        return response.send(result.array());
    const user = yield (0, user_2.findByEmail)(request.session.userInfo.email);
    if (user) {
        const updateUser = new user_3.UpdateUserInfo(user.id);
        updateUser.updatePassword((0, hashPassword_1.hash)(request.body.newPassword));
        return response.status(200).send('updated');
    }
    return response.sendStatus(400);
}));
