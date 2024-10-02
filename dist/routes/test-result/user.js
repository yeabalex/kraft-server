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
exports.testResultRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/test-result/user");
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.testResultRoute = (0, express_1.Router)();
exports.testResultRoute.post('/api/add/test-result', (0, express_validator_1.body)('testName').notEmpty().withMessage('Test name is required'), (0, express_validator_1.body)('score').isFloat({ min: 0 }).withMessage('Score must be a positive number'), (0, express_validator_1.body)('dateTaken').isISO8601().withMessage('Date must be in ISO 8601 format'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        request.body.id = (0, uuid_1.v4)();
        request.body.userId = request.user.id;
        const editTestResult = new user_1.EditTestResult(yield request.user);
        const addedTestResult = yield editTestResult.addInfo(request.body);
        return response.json(addedTestResult);
    }
    catch (error) {
        console.error("Error adding test result:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get test result information
exports.testResultRoute.get('/api/user/test-results', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showTestResults = new user_1.EditTestResult(yield request.user);
    return response.send(yield showTestResults.getInfo());
}));
// Endpoint to update test result information
exports.testResultRoute.put('/api/update/test-result', (0, express_validator_1.body)('testName').notEmpty().withMessage('Test name is required'), (0, express_validator_1.body)('score').isFloat({ min: 0 }).withMessage('Score must be a positive number'), (0, express_validator_1.body)('dateTaken').isISO8601().withMessage('Date must be in ISO 8601 format'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const updateTestResult = new user_1.EditTestResult(yield request.user);
    const updatedTestResult = yield updateTestResult.updateTestResultInfo(request.body, request.query.id);
    return response.send(updatedTestResult);
}));
// Endpoint to delete test result information
exports.testResultRoute.delete('/api/delete/test-result', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteTestResult = new user_1.EditTestResult(yield request.user);
    const deletedTestResult = yield deleteTestResult.deleteTestResultInfo(request.query.id);
    return response.send(deletedTestResult);
}));
