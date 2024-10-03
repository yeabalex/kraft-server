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
exports.certificationRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/certification/user"); // Adjust import path as per your project structure
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.certificationRoute = (0, express_1.Router)();
// Endpoint to add certification information
exports.certificationRoute.post('/api/add/certification', (0, express_validator_1.check)('arr.*.name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            const editCertification = new user_1.EditCertification(yield request.user);
            const addedCertification = yield editCertification.addInfo(req);
            res.push(addedCertification);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding certification:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get certification information
exports.certificationRoute.get('/api/user/certification', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showCertification = new user_1.EditCertification(yield request.user);
    return response.send(yield showCertification.getInfo());
}));
// Endpoint to update certification information
exports.certificationRoute.put('/api/update/certification', (0, express_validator_1.check)('arr.*.name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const updateCertification = new user_1.EditCertification(yield request.user);
        const updatedResponse = [];
        for (const req of request.body.arr) {
            const updatedCertification = yield updateCertification.updateCertificationInfo(req, req.id);
            updatedResponse.push(updatedCertification);
        }
        return response.send(updatedResponse);
    }
    catch (error) {
        console.error("Error updating certification:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to delete certification information
exports.certificationRoute.delete('/api/delete/certification', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteCertification = new user_1.EditCertification(yield request.user);
    const deletedCertification = yield deleteCertification.deleteCertificationInfo(request.query.id);
    return response.send(deletedCertification);
}));
