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
exports.EditWorkExperience = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditWorkExperience {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(workExperienceInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.workExperience.create({
                    data: Object.assign(Object.assign({}, workExperienceInfo), { user: {
                            connect: {
                                id: this.user.id
                            }
                        }, from: workExperienceInfo.from ? new Date(workExperienceInfo.from) : undefined, to: workExperienceInfo.to ? new Date(workExperienceInfo.to) : undefined })
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
                const infoExists = yield prisma.workExperience.findMany({
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
    updateWorkExperienceInfo(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedWorkExperience = yield prisma.workExperience.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, fields), { from: fields.from ? new Date(fields.from) : undefined, to: fields.to ? new Date(fields.to) : undefined })
                });
                return updatedWorkExperience;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    deleteWorkExperienceInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedWorkExperience = yield prisma.workExperience.delete({
                    where: {
                        id: id
                    }
                });
                return deletedWorkExperience;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.EditWorkExperience = EditWorkExperience;
