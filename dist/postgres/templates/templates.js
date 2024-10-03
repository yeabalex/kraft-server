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
exports.Template = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Template {
    constructor(user) {
        this.user = user;
    }
    addTemplate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedTemplate = yield prisma.template.create({
                    data: Object.assign({}, data)
                });
                return addedTemplate;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    getAllTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allTemplates = yield prisma.template.findMany();
                return allTemplates;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    getTemplate(templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundTemplate = yield prisma.template.findMany({
                    where: {
                        name: templateName
                    }
                });
                return foundTemplate;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
}
exports.Template = Template;
