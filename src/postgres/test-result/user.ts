import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditTestResult {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(testResultInfo: any) {
        try {
            const addedInfo = await prisma.testResult.create({
                data: {
                    ...testResultInfo,
                    user: {
                        connect: {
                            id: this.user.id
                        }
                    },
                    dateTaken: new Date(testResultInfo.dateTaken)
                }
            });
            return addedInfo;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo() {
        try {
            const infoExists = await prisma.testResult.findMany({
                where: {
                    userId: this.user.id,
                }
            });
            return infoExists;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateTestResultInfo(fields: any, id: any) {
        try {
            const updatedTestResult = await prisma.testResult.update({
                where: { id: id },
                data: {
                    ...fields,
                    dateTaken: fields.dateTaken ? new Date(fields.dateTaken) : undefined
                }
            });
            return updatedTestResult;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteTestResultInfo(id: any) {
        try {
            const deletedTestResult = await prisma.testResult.delete({
                where: {
                    id: id
                }
            });
            return deletedTestResult;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
