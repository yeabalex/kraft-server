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
exports.CV = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CV {
    constructor(user, template) {
        this.user = user;
        this.template = template;
    }
    getCv() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundCv = yield prisma.cv.findUnique({
                    where: {
                        id: this.user.id
                    }
                });
                return foundCv;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    cvContents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cvData = yield prisma.user.findMany({
                    where: {
                        id: this.user.id
                    },
                    include: {
                        certifications: true,
                        educations: true,
                        languages: true,
                        personalInfo: true,
                        projects: true,
                        softSkills: true,
                        technicalSkills: true,
                        testResults: true,
                        volunteers: true,
                        workExperiences: true,
                    }
                });
                return JSON.stringify(cvData, null, 2);
            }
            catch (err) {
                console.error(err);
                return 'nil';
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    createCV(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdCV = prisma.cv.create({
                    data: {
                        title: data.title,
                        template: {
                            connect: {
                                id: this.template[0].id
                            }
                        },
                        user: {
                            connect: {
                                id: this.user.id
                            }
                        },
                        content: data.content
                    }
                });
                return createdCV;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
    deleteCV(cvid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCV = yield prisma.cv.delete({
                    where: {
                        id: cvid
                    }
                });
                return deletedCV;
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
exports.CV = CV;
