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
exports.EditTestResult = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditTestResult {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(testResultInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.testResult.create({
                    data: Object.assign(Object.assign({}, testResultInfo), { user: {
                            connect: {
                                id: this.user.id
                            }
                        }, dateTaken: new Date(testResultInfo.dateTaken) })
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
                const infoExists = yield prisma.testResult.findMany({
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
    updateTestResultInfo(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTestResult = yield prisma.testResult.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, fields), { dateTaken: fields.dateTaken ? new Date(fields.dateTaken) : undefined })
                });
                return updatedTestResult;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    deleteTestResultInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTestResult = yield prisma.testResult.delete({
                    where: {
                        id: id
                    }
                });
                return deletedTestResult;
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
exports.EditTestResult = EditTestResult;
