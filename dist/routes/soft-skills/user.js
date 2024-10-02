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
exports.softSkillRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/soft-skills/user");
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.softSkillRoute = (0, express_1.Router)();
// Endpoint to add soft skill information
exports.softSkillRoute.post('/api/add/soft-skill', (0, express_validator_1.check)('arr.*.skill')
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
            const editSoftSkill = new user_1.EditSoftSkill(yield request.user);
            const addedSoftSkill = yield editSoftSkill.addInfo(req);
            res.push(addedSoftSkill);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding soft skill:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get soft skill information
exports.softSkillRoute.get('/api/user/soft-skill', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showSoftSkill = new user_1.EditSoftSkill(yield request.user);
    return response.send(yield showSoftSkill.getInfo());
}));
// Endpoint to update soft skill information
exports.softSkillRoute.put('/api/update/soft-skill', (0, express_validator_1.check)('arr.*.skill')
    .notEmpty().withMessage('Skill is required')
    .isString().withMessage('Skill must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const updateSoftSkill = new user_1.EditSoftSkill(yield request.user);
        const updatedResponse = [];
        for (const req of request.body.arr) {
            const updatedSoftSkill = yield updateSoftSkill.updateSoftSkillInfo(req, req.id);
            updatedResponse.push(updatedSoftSkill);
        }
        return response.send(updatedResponse);
    }
    catch (error) {
        console.error("Error updating soft skill:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to delete soft skill information
exports.softSkillRoute.delete('/api/delete/soft-skill', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteSoftSkill = new user_1.EditSoftSkill(yield request.user);
    const deletedSoftSkill = yield deleteSoftSkill.deleteSoftSkillInfo(request.query.id);
    return response.send(deletedSoftSkill);
}));
