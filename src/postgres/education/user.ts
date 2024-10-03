import { PrismaClient, Education } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
}

export class EditEducation {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }

    async addInfo(educationInfo: Omit<Education, 'id' | 'userId'>): Promise<Education> {
        try {
            const addedInfo = await prisma.education.create({
                data: {
                    ...educationInfo,
                    user: {
                        connect: {
                            id: this.user.id,
                        }
                    },
                    from: educationInfo.from ? new Date(educationInfo.from) : undefined,
                    to: educationInfo.to ? new Date(educationInfo.to) : undefined,
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

    async getInfo(): Promise<Education[]> {
        try {
            const infoExists = await prisma.education.findMany({
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

    async updateEducationInfo(fields: Partial<Omit<Education, 'id' | 'userId'>>, id: string): Promise<Education> {
        try {
            const updatedEducation = await prisma.education.update({
                where: { id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined                    
                }
            });
            return updatedEducation;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteEducationInfo(id: string): Promise<Education> {
        try { 
            const deletedEducation = await prisma.education.delete({
                where: { id }
            });
            return deletedEducation;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}
