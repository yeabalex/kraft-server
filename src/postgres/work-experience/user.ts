import { PrismaClient, WorkExperience } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
}

export class EditWorkExperience {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }

    async addInfo(workExperienceInfo: Omit<WorkExperience, 'id' | 'userId'>) {
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
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo(): Promise<WorkExperience[]> {
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

    async updateWorkExperienceInfo(fields: Partial<Omit<WorkExperience, 'id' | 'userId'>>, id: string): Promise<WorkExperience> {
        try {
            const updatedWorkExperience = await prisma.workExperience.update({
                where: { id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
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

    async deleteWorkExperienceInfo(id: string): Promise<WorkExperience> {
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
