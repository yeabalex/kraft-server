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
exports.EditEducation = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditEducation {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(educationInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.education.create({
                    data: Object.assign(Object.assign({}, educationInfo), { user: {
                            connect: {
                                id: this.user.id,
                            }
                        }, from: educationInfo.from ? new Date(educationInfo.from) : undefined, to: educationInfo.to ? new Date(educationInfo.to) : undefined })
                });
                return addedInfo;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const infoExists = yield prisma.education.findMany({
                    where: {
                        userId: this.user.id,
                    }
                });
                return infoExists;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    updateEducationInfo(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedEducation = yield prisma.education.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, fields), { from: fields.from ? new Date(fields.from) : undefined, to: fields.to ? new Date(fields.to) : undefined })
                });
                return updatedEducation;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    deleteEducationInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedEducation = yield prisma.education.delete({
                    where: {
                        id: id
                    }
                });
                return deletedEducation;
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
exports.EditEducation = EditEducation;
