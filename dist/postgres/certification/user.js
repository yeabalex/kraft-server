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
exports.EditCertification = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditCertification {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(certificationInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.certification.create({
                    data: Object.assign(Object.assign({}, certificationInfo), { user: {
                            connect: {
                                id: this.user.id,
                            }
                        }, from: certificationInfo.from ? new Date(certificationInfo.from) : undefined, to: certificationInfo.to ? new Date(certificationInfo.to) : undefined })
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
                const infoExists = yield prisma.certification.findMany({
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
    updateCertificationInfo(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCertification = yield prisma.certification.update({
                    where: { id },
                    data: Object.assign(Object.assign({}, fields), { from: fields.from ? new Date(fields.from) : undefined, to: fields.to ? new Date(fields.to) : undefined })
                });
                return updatedCertification;
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
    deleteCertificationInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCertification = yield prisma.certification.delete({
                    where: { id }
                });
                return deletedCertification;
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
exports.EditCertification = EditCertification;
