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
exports.EditLanguage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditLanguage {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(languageInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.language.create({
                    data: Object.assign(Object.assign({}, languageInfo), { user: {
                            connect: {
                                id: this.user.id
                            }
                        } })
                });
                return addedInfo;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const infoExists = yield prisma.language.findMany({
                    where: {
                        userId: this.user.id,
                    }
                });
                return infoExists;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    updateLanguageInfo(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedLanguage = yield prisma.language.update({
                    where: { id },
                    data: Object.assign({}, fields)
                });
                return updatedLanguage;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    deleteLanguageInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedLanguage = yield prisma.language.delete({
                    where: { id }
                });
                return deletedLanguage;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.EditLanguage = EditLanguage;
