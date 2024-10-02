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
exports.EditVolunteer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditVolunteer {
    constructor(userObject) {
        this.user = userObject;
    }
    addInfo(volunteerInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedInfo = yield prisma.volunteer.create({
                    data: Object.assign(Object.assign({}, volunteerInfo), { user: {
                            connect: {
                                id: this.user.id
                            }
                        }, from: volunteerInfo.from ? new Date(volunteerInfo.from) : undefined, to: volunteerInfo.to ? new Date(volunteerInfo.to) : undefined })
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
                const infoExists = yield prisma.volunteer.findMany({
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
    updateVolunteerInfo(fields, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedVolunteer = yield prisma.volunteer.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, fields), { from: fields.from ? new Date(fields.from) : undefined, to: fields.to ? new Date(fields.to) : undefined })
                });
                return updatedVolunteer;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    deleteVolunteerInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedVolunteer = yield prisma.volunteer.delete({
                    where: {
                        id: id
                    }
                });
                return deletedVolunteer;
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
exports.EditVolunteer = EditVolunteer;
