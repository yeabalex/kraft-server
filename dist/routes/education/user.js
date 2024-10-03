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
exports.educationRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/education/user"); // Adjust import path as per your project structure
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.educationRoute = (0, express_1.Router)();
// Endpoint to add education information
exports.educationRoute.post('/api/add/education', (0, express_validator_1.check)('arr.*.credential')
    .notEmpty().withMessage('Credential is required')
    .isString().withMessage('Credential must be a string'), (0, express_validator_1.check)('arr.*.organization')
    .notEmpty().withMessage('Organization is required')
    .isString().withMessage('Organization must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(yield request.body, "from server");
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const res = [];
        for (const req of request.body.arr) {
            req.id = (0, uuid_1.v4)();
            //req.userId = request.user.id;
            const editEducation = new user_1.EditEducation(yield request.user);
            const addedEducation = yield editEducation.addInfo(req);
            res.push(addedEducation);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding education:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to update education information
exports.educationRoute.get('/api/user/education', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showEducation = new user_1.EditEducation(yield request.user);
    return response.send(yield showEducation.getInfo());
}));
exports.educationRoute.put('/api/update/education', (0, express_validator_1.check)('arr.*.credential')
    .notEmpty().withMessage('Credential is required')
    .isString().withMessage('Credential must be a string'), (0, express_validator_1.check)('arr.*.organization')
    .notEmpty().withMessage('Organization is required')
    .isString().withMessage('Organization must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const updateEducation = new user_1.EditEducation(yield request.user);
        const updatedResponse = [];
        for (const req of request.body.arr) {
            const updatedEducation = yield updateEducation.updateEducationInfo(req, req.id);
            updatedResponse.push(updatedEducation);
        }
        return response.send(updatedResponse);
    }
    catch (error) {
        console.error("Error updating education:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
exports.educationRoute.delete('/api/delete/education', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(401).send('Unauthorized');
    const deleteEducation = new user_1.EditEducation(request.user);
    const deletedEducation = yield deleteEducation.deleteEducationInfo(request.query.id);
    return response.json(deletedEducation);
}));
