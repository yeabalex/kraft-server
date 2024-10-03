import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditWorkExperience {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(workExperienceInfo: any) {
        try {
            const { userId, ...restInfo } = workExperienceInfo;
            const addedInfo = await prisma.workExperience.create({
                data: {
                    ...restInfo,
                    user: {
                        connect: {
                            id: this.user.id
                        }
                    },
                    from: restInfo.from ? new Date(restInfo.from) : undefined,
                    to: restInfo.to ? new Date(restInfo.to) : undefined
                }
            });
            return addedInfo;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo() {
        try {
            const infoExists = await prisma.workExperience.findMany({
                where: {
                    userId: this.user.id,
                }
            });
            return infoExists;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateWorkExperienceInfo(fields: any, id: string) {
        try {
            const { userId, ...restFields } = fields;
            const updatedWorkExperience = await prisma.workExperience.update({
                where: { id },
                data: {
                    ...restFields,
                    from: restFields.from ? new Date(restFields.from) : undefined,
                    to: restFields.to ? new Date(restFields.to) : undefined
                }
            });
            return updatedWorkExperience;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteWorkExperienceInfo(id: string) {
        try {
            const deletedWorkExperience = await prisma.workExperience.delete({
                where: { id }
            });
            return deletedWorkExperience;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}
