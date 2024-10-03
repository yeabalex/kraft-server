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
exports.cvRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../postgres/cv/user");
const templates_1 = require("../../postgres/templates/templates");
const uuid_1 = require("uuid");
exports.cvRoutes = (0, express_1.Router)();
exports.cvRoutes.post('/api/create/cv/:template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(403);
    const templateName = req.params.template;
    const findTemplate = new templates_1.Template(yield req.user);
    const foundTemplate = yield findTemplate.getTemplate(templateName);
    const createdCV = new user_1.CV(yield req.user, foundTemplate);
    req.body.id = (0, uuid_1.v4)();
    req.body.content = yield createdCV.cvContents();
    return res.send(yield createdCV.createCV(yield req.body));
}));
exports.cvRoutes.delete('/api/delete/cv/:template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.sendStatus(403);
    const templateName = req.params.template;
    const findTemplate = new templates_1.Template(yield req.user);
    const foundTemplate = yield findTemplate.getTemplate(templateName);
    const deletedCV = new user_1.CV(yield req.user, foundTemplate);
    return res.send(yield deletedCV.deleteCV(req.query.id));
}));
exports.cvRoutes.get('/api/get/cvs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isAuthenticated())
        return res.sendStatus(403);
    const cv = new user_1.CV(yield req.user);
    const userCv = yield cv.getCv();
    if (!userCv)
        return res.send("n");
    return res.send("y");
}));
