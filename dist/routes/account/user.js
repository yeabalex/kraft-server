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
exports.userRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/account/user");
const express_validator_1 = require("express-validator");
const signUpValidation_1 = require("../../utils/signUpValidation");
const hashPassword_1 = require("../../utils/hashPassword");
const uuid_1 = require("uuid");
const local_1 = __importDefault(require("../../auth/local"));
const user_2 = require("../../postgres/account/user");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post('/api/auth/signup', (0, express_validator_1.checkSchema)(signUpValidation_1.signUpSchema), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(request);
    if (result.array().length)
        return response.send(result.array());
    const userData = (0, express_validator_1.matchedData)(request);
    if (yield (0, user_1.userExists)(userData))
        return response.status(401).send('User exists');
    userData.id = (0, uuid_1.v4)();
    userData.password = (0, hashPassword_1.hash)(userData.password);
    yield (0, user_1.createUser)(userData);
    return response.sendStatus(200);
}));
exports.userRoute.post('/api/auth/login', local_1.default.authenticate('local'), (request, res) => {
    res.sendStatus(200);
});
exports.userRoute.get('/api/auth/login/status', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield request.user))
        return response.sendStatus(401);
    response.status(200).send(yield request.user);
}));
exports.userRoute.post('/api/auth/logout', (request, response) => {
    request.logout((err) => {
        if (err) {
            return response.status(500).send('Failed to log out.');
        }
        request.session.destroy((err) => {
            if (err) {
                return response.status(500).send('Failed to destroy session.');
            }
            response.clearCookie('connect.sid', { path: '/api/auth/' });
            response.status(200).send('Logged out successfully.');
        });
    });
});
exports.userRoute.delete('/api/auth/delete', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const sess = yield request.user;
    if (!sess) {
        return response.status(403).send("Session expired");
    }
    const deletedAccount = (0, user_2.deleteAccount)(sess.email, request.body.password);
    return response.status(200).send(deletedAccount);
}));
