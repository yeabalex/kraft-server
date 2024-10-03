import { PrismaClient, SoftSkill } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
}

export class EditSoftSkill {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }

    async addInfo(softSkillInfo: Omit<SoftSkill, 'id' | 'userId'>): Promise<SoftSkill> {
        try {
            const addedInfo = await prisma.softSkill.create({
                data: {
                    ...softSkillInfo,
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

    async getInfo(): Promise<SoftSkill[]> {
        try {
            const infoExists = await prisma.softSkill.findMany({
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

    async updateSoftSkillInfo(fields: Partial<Omit<SoftSkill, 'id' | 'userId'>>, id: string): Promise<SoftSkill> {
        try {
            const updatedSoftSkill = await prisma.softSkill.update({
                where: { id },
                data: {
                    ...fields
                }
            });
            return updatedSoftSkill;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteSoftSkillInfo(id: string): Promise<SoftSkill> {
        try {
            const deletedSoftSkill = await prisma.softSkill.delete({
                where: { id }
            });
            return deletedSoftSkill;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}