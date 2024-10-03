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
exports.workExperienceRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/work-experience/user");
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.workExperienceRoute = (0, express_1.Router)();
// Endpoint to add work experience information
exports.workExperienceRoute.post('/api/add/work-experience', (0, express_validator_1.check)('arr.*.position')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'), (0, express_validator_1.check)('arr.*.company')
    .notEmpty().withMessage('Company is required')
    .isString().withMessage('Com must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            const editWorkExperience = new user_1.EditWorkExperience(yield request.user);
            const addedWorkExperience = yield editWorkExperience.addInfo(req);
            res.push(addedWorkExperience);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding work experience:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get work experience information
exports.workExperienceRoute.get('/api/user/work-experience', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showWorkExperience = new user_1.EditWorkExperience(yield request.user);
    return response.send(yield showWorkExperience.getInfo());
}));
// Endpoint to update work experience information
exports.workExperienceRoute.put('/api/update/work-experience', (0, express_validator_1.check)('arr.*.position')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'), (0, express_validator_1.check)('arr.*.company')
    .notEmpty().withMessage('Company is required')
    .isString().withMessage('Com must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const updateWorkExperience = new user_1.EditWorkExperience(yield request.user);
    const updatedResponse = [];
    for (const req of request.body.arr) {
        const updatedWorkExperience = yield updateWorkExperience.updateWorkExperienceInfo(req, req.id);
        updatedResponse.push(updatedWorkExperience);
    }
    return response.send(updatedResponse);
}));
// Endpoint to delete work experience information
exports.workExperienceRoute.delete('/api/delete/work-experience', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteWorkExperience = new user_1.EditWorkExperience(yield request.user);
    const deletedWorkExperience = yield deleteWorkExperience.deleteWorkExperienceInfo(request.query.id);
    return response.send(deletedWorkExperience);
}));
