import { PrismaClient, TechnicalSkill } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
}

export class EditTechnicalSkill {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }

    async addInfo(technicalSkillInfo: Omit<TechnicalSkill, 'id' | 'userId'>): Promise<TechnicalSkill> {
        try {
            const addedInfo = await prisma.technicalSkill.create({
                data: {
                    ...technicalSkillInfo,
                    user: {
                        connect: {
                            id: this.user.id
                        }
                    }
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

    async getInfo(): Promise<TechnicalSkill[]> {
        try {
            const infoExists = await prisma.technicalSkill.findMany({
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

    async updateTechnicalSkillInfo(fields: Partial<Omit<TechnicalSkill, 'id' | 'userId'>>, id: string): Promise<TechnicalSkill> {
        try {
            const updatedTechnicalSkill = await prisma.technicalSkill.update({
                where: { id },
                data: {
                    ...fields
                }
            });
            return updatedTechnicalSkill;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteTechnicalSkillInfo(id: string): Promise<TechnicalSkill> {
        try {
            const deletedTechnicalSkill = await prisma.technicalSkill.delete({
                where: { id }
            });
            return deletedTechnicalSkill;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}