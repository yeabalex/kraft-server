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
exports.technicalSkillRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/technical-skill/user"); // Adjust import path as per your project structure
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.technicalSkillRoute = (0, express_1.Router)();
// Endpoint to add technical skill information
exports.technicalSkillRoute.post('/api/add/technical-skill', (0, express_validator_1.check)('arr.*.group')
    .notEmpty().withMessage('Group is required')
    .isString().withMessage('Group must be a string'), (0, express_validator_1.check)('arr.*.skill')
    .notEmpty().withMessage('Skill is required')
    .isString().withMessage('Skill must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            req.userId = request.user.id;
            const editTechnicalSkill = new user_1.EditTechnicalSkill(yield request.user);
            const addedTechnicalSkill = yield editTechnicalSkill.addInfo(req);
            res.push(addedTechnicalSkill);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding technical skill:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get technical skill information
exports.technicalSkillRoute.get('/api/user/technical-skill', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showTechnicalSkill = new user_1.EditTechnicalSkill(yield request.user);
    return response.send(yield showTechnicalSkill.getInfo());
}));
// Endpoint to update technical skill information
exports.technicalSkillRoute.put('/api/update/technical-skill', (0, express_validator_1.check)('arr.*.group')
    .notEmpty().withMessage('Group is required')
    .isString().withMessage('Group must be a string'), (0, express_validator_1.check)('arr.*.skill')
    .notEmpty().withMessage('Skill is required')
    .isString().withMessage('Skill must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const updateTechnicalSkill = new user_1.EditTechnicalSkill(yield request.user);
        const updatedResponse = [];
        for (const req of request.body.arr) {
            const updatedTechnicalSkill = yield updateTechnicalSkill.updateTechnicalSkillInfo(req, req.id);
            updatedResponse.push(updatedTechnicalSkill);
        }
        return response.send(updatedResponse);
    }
    catch (error) {
        console.error("Error updating technical skill:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to delete technical skill information
exports.technicalSkillRoute.delete('/api/delete/technical-skill', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteTechnicalSkill = new user_1.EditTechnicalSkill(yield request.user);
    const deletedTechnicalSkill = yield deleteTechnicalSkill.deleteTechnicalSkillInfo(request.query.id);
    return response.send(deletedTechnicalSkill);
}));
