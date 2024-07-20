import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditWorkExperience {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(workExperienceInfo: any) {
        try {
            const addedInfo = await prisma.workExperience.create({
                data: {
                    ...workExperienceInfo,
                    user: {
                        connect: {
                            id: this.user.id
                        }
                    },
                    from: workExperienceInfo.from ? new Date(workExperienceInfo.from) : undefined,
                    to: workExperienceInfo.to ? new Date(workExperienceInfo.to) : undefined
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
            const infoExists = await prisma.workExperience.findMany({
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

    async updateWorkExperienceInfo(fields: any, id: any) {
        try {
            const updatedWorkExperience = await prisma.workExperience.update({
                where: { id: id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
                }
            });
            return updatedWorkExperience;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteWorkExperienceInfo(id: any) {
        try {
            const deletedWorkExperience = await prisma.workExperience.delete({
                where: {
                    id: id
                }
            });
            return deletedWorkExperience;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
