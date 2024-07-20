import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditTechnicalSkill {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(technicalSkillInfo: any) {
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
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo() {
        try {
            const infoExists = await prisma.technicalSkill.findMany({
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

    async updateTechnicalSkillInfo(fields: any, id: any) {
        try {
            const updatedTechnicalSkill = await prisma.technicalSkill.update({
                where: { id: id },
                data: {
                    ...fields
                }
            });
            return updatedTechnicalSkill;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteTechnicalSkillInfo(id: any) {
        try {
            const deletedTechnicalSkill = await prisma.technicalSkill.delete({
                where: {
                    id: id
                }
            });
            return deletedTechnicalSkill;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
