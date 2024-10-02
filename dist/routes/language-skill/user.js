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
exports.languageRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/language-skill/user");
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];
exports.languageRoute = (0, express_1.Router)();
// Endpoint to add language information
exports.languageRoute.post('/api/add/language', (0, express_validator_1.check)('arr.*.langName')
    .notEmpty().withMessage('Language name is required')
    .isString().withMessage('Language name must be a string'), (0, express_validator_1.check)('arr.*.proficiency')
    .isIn(proficiencyLevels).withMessage('Invalid proficiency level'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            const editLanguage = new user_1.EditLanguage(yield request.user);
            const addedLanguage = yield editLanguage.addInfo(req);
            res.push(addedLanguage);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding language:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get language information
exports.languageRoute.get('/api/user/language', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showLanguage = new user_1.EditLanguage(yield request.user);
    return response.send(yield showLanguage.getInfo());
}));
// Endpoint to update language information
exports.languageRoute.put('/api/update/language', (0, express_validator_1.check)('arr.*.langName')
    .notEmpty().withMessage('Language name is required')
    .isString().withMessage('Language name must be a string'), (0, express_validator_1.check)('arr.*.proficiency')
    .isIn(proficiencyLevels).withMessage('Invalid proficiency level'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const updateLanguage = new user_1.EditLanguage(yield request.user);
        const updatedResponse = [];
        for (const req of request.body.arr) {
            const updatedLanguage = yield updateLanguage.updateLanguageInfo(req, req.id);
            updatedResponse.push(updatedLanguage);
        }
        return response.send(updatedResponse);
    }
    catch (error) {
        console.error("Error updating language:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to delete language information
exports.languageRoute.delete('/api/delete/language', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteLanguage = new user_1.EditLanguage(yield request.user);
    const deletedLanguage = yield deleteLanguage.deleteLanguageInfo(request.query.id);
    return response.send(deletedLanguage);
}));
