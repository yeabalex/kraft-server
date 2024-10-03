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
exports.templateRoute = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/personal-info/user");
const user_2 = require("../../postgres/cv/user");
const templates_1 = require("../../postgres/templates/templates");
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
exports.templateRoute = (0, express_1.Router)();
exports.templateRoute.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).send('An unexpected error occurred');
});
exports.templateRoute.get('/api/templates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(403);
    const templates = new templates_1.Template(yield req.user);
    const templateArray = yield templates.getAllTemplates();
    res.send(templateArray);
}));
exports.templateRoute.get('/api/templates/:templateName', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.user)
        return response.sendStatus(403);
    const templateName = request.params.templateName;
    const cv = new user_1.EditPersonalInfo(yield request.user);
    const getTemplate = new templates_1.Template(yield request.user);
    const s = new user_2.CV(yield request.user, yield getTemplate.getTemplate(templateName));
    const data = yield s.cvContents();
    const jsonData = yield JSON.parse(data);
    // console.log(jsonData[0])
    response.render(`template-1/${templateName}`, Object.assign({}, jsonData[0]));
}));
exports.templateRoute.post('/api/add/template', (0, express_validator_1.body)('name').notEmpty().isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(403);
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        return res.status(400).send(result.array());
    const addedTemplate = new templates_1.Template(yield req.user);
    req.body.id = (0, uuid_1.v4)();
    const template = addedTemplate.addTemplate(req.body);
    return res.status(200).send(yield template);
}));
