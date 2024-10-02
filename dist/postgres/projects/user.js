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
exports.EditProject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditProject {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(projectInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.project.create({
                    data: Object.assign(Object.assign({}, projectInfo), { user: {
                            connect: {
                                id: this.user.id
                            }
                        }, from: projectInfo.from ? new Date(projectInfo.from) : undefined, to: projectInfo.to ? new Date(projectInfo.to) : undefined })
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
                const infoExists = yield prisma.project.findMany({
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
    updateProjectInfo(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProject = yield prisma.project.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, fields), { from: fields.from ? new Date(fields.from) : undefined, to: fields.to ? new Date(fields.to) : undefined })
                });
                return updatedProject;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    deleteProjectInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedProject = yield prisma.project.delete({
                    where: {
                        id: id
                    }
                });
                return deletedProject;
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
exports.EditProject = EditProject;
