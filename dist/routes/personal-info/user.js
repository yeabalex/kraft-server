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
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalInfoRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/personal-info/user");
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
exports.personalInfoRoute = (0, express_1.Router)();
exports.personalInfoRoute.post('/api/add/personal-info', (0, express_validator_1.body)('firstName').notEmpty().withMessage('Enter your name'), (0, express_validator_1.body)('lastName').notEmpty().withMessage('Enter your last name'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield request.user))
            return response.status(401).json({ error: 'Unauthorized' });
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        request.body.id = (0, uuid_1.v4)();
        const newPersonalInfo = new user_1.EditPersonalInfo(yield request.user);
        const addedInfo = yield newPersonalInfo.addInfo(request.body);
        return response.json(addedInfo);
    }
    catch (error) {
        console.error('Error adding personal info:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}));
exports.personalInfoRoute.put('/api/update/personal-info', (0, express_validator_1.body)('firstName').notEmpty().withMessage('Enter your name'), (0, express_validator_1.body)('lastName').notEmpty().withMessage('Enter your last name'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield request.user))
        return response.status(400).send('you freakin hacker');
    if ((0, express_validator_1.validationResult)(request).array().length)
        return response.status(401).send((0, express_validator_1.validationResult)(request).array());
    const updatePersonalInfo = new user_1.EditPersonalInfo(yield request.user);
    if (!(yield updatePersonalInfo.getInfo()))
        return response.status(403).send("No personal info");
    updatePersonalInfo.updateInfo(request.body);
    return response.status(200).send('updated');
}));
exports.personalInfoRoute.delete('/api/delete/personal-info', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield request.user))
        return response.status(400).send('you freakin hacker');
    const deletePersonalInfo = new user_1.EditPersonalInfo(yield request.user);
    deletePersonalInfo.deletePersonalInfo();
    return response.status(200).send('deleted');
}));
exports.personalInfoRoute.get('/api/user/personal-info', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield request.user))
        return response.status(400).send('you freakin hacker');
    const showPersonalInfo = new user_1.EditPersonalInfo(yield request.user);
    return response.status(200).send(yield showPersonalInfo.getInfo());
}));
