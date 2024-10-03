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
exports.EditPersonalInfo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditPersonalInfo {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.personalInfo.create({
                    data: Object.assign(Object.assign({}, userInfo), { user: {
                            connect: {
                                id: this.user.id
                            }
                        }, dateOfBirth: userInfo.dateOfBirth.length > 0 ? new Date(userInfo.dateOfBirth) : undefined })
                });
                return addedInfo;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const infoExists = yield prisma.personalInfo.findUnique({
                    where: {
                        userId: this.user.id
                    }
                });
                return infoExists;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    updateInfo(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedInfo = yield prisma.personalInfo.update({
                    where: { userId: this.user.id },
                    data: Object.assign(Object.assign({}, fields), { dateOfBirth: fields.dateOfBirth.length > 0 ? new Date(fields.dateOfBirth) : undefined })
                });
                return updatedInfo;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    deletePersonalInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedInfo = yield prisma.personalInfo.delete({
                    where: {
                        userId: this.user.id
                    }
                });
                return deletedInfo;
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
exports.EditPersonalInfo = EditPersonalInfo;
