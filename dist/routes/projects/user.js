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
exports.projectRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/projects/user");
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
exports.projectRoute = (0, express_1.Router)();
// Endpoint to add project information
exports.projectRoute.post('/api/add/project', (0, express_validator_1.check)('arr.*.title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            const editProject = new user_1.EditProject(yield request.user);
            const addedProject = yield editProject.addInfo(req);
            res.push(addedProject);
        }
        return response.json(res);
    }
    catch (error) {
        console.error("Error adding project:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to get project information
exports.projectRoute.get('/api/user/project', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const showProject = new user_1.EditProject(yield request.user);
    return response.send(yield showProject.getInfo());
}));
// Endpoint to update project information
exports.projectRoute.put('/api/update/project', (0, express_validator_1.check)('arr.*.title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user)
            return response.status(400).send('Unauthorized');
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        const updateProject = new user_1.EditProject(yield request.user);
        const updatedResponse = [];
        for (const req of request.body.arr) {
            const updatedProject = yield updateProject.updateProjectInfo(req, req.id);
            updatedResponse.push(updatedProject);
        }
        return response.send(updatedResponse);
    }
    catch (error) {
        console.error("Error updating project:", error);
        return response.status(500).send("Internal Server Error");
    }
}));
// Endpoint to delete project information
exports.projectRoute.delete('/api/delete/project', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.status(400).send('Unauthorized');
    const deleteProject = new user_1.EditProject(yield request.user);
    const deletedProject = yield deleteProject.deleteProjectInfo(request.query.id);
    return response.send(deletedProject);
}));
