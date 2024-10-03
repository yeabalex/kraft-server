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
exports.volunteerRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/volunteer/user");
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.volunteerRoute = (0, express_1.Router)();
// Endpoint to add volunteer information
exports.volunteerRoute.post('/api/add/volunteer', (0, express_validator_1.check)('arr.*.organization')
    .notEmpty().withMessage('Organization is required')
    .isString().withMessage('Organization must be a string'), (0, express_validator_1.check)('arr.*.role')
    .notEmpty().withMessage('Role is required')
    .isString().withMessage('Role must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            const editVolunteer = new user_1.EditVolunteer(yield request.user);
            const addedVolunteer = yield editVolunteer.addInfo(req);
            res.push(addedVolunteer);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding volunteer:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get volunteer information
exports.volunteerRoute.get('/api/user/volunteers', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showVolunteers = new user_1.EditVolunteer(yield request.user);
    return response.send(yield showVolunteers.getInfo());
}));
// Endpoint to update volunteer information
exports.volunteerRoute.put('/api/update/volunteer', (0, express_validator_1.check)('arr.*.organization')
    .notEmpty().withMessage('Organization is required')
    .isString().withMessage('Organization must be a string'), (0, express_validator_1.check)('arr.*.role')
    .notEmpty().withMessage('Role is required')
    .isString().withMessage('Role must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const updateVolunteer = new user_1.EditVolunteer(yield request.user);
        const updatedResponse = [];
        for (const req of request.body.arr) {
            const updatedVolunteer = yield updateVolunteer.updateVolunteerInfo(req, req.id);
            updatedResponse.push(updatedVolunteer);
        }
        return response.send(updatedResponse);
    }
    catch (error) {
        console.error("Error updating volunteer:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to delete volunteer information
exports.volunteerRoute.delete('/api/delete/volunteer', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteVolunteer = new user_1.EditVolunteer(yield request.user);
    const deletedVolunteer = yield deleteVolunteer.deleteVolunteerInfo(request.query.id);
    return response.send(deletedVolunteer);
}));
