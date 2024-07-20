import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditSoftSkill {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(softSkillInfo: any) {
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
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo() {
        try {
            const infoExists = await prisma.softSkill.findMany({
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

    async updateSoftSkillInfo(fields: any, id: any) {
        try {
            const updatedSoftSkill = await prisma.softSkill.update({
                where: { id: id },
                data: {
                    ...fields
                }
            });
            return updatedSoftSkill;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteSoftSkillInfo(id: any) {
        try {
            const deletedSoftSkill = await prisma.softSkill.delete({
                where: {
                    id: id
                }
            });
            return deletedSoftSkill;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
