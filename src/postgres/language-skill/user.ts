import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditLanguage {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(languageInfo: any) {
        try {
            const addedInfo = await prisma.language.create({
                data: {
                    ...languageInfo,
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
            const infoExists = await prisma.language.findMany({
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

    async updateLanguageInfo(fields: any, id: any) {
        try {
            const updatedLanguage = await prisma.language.update({
                where: { id: id },
                data: {
                    ...fields
                }
            });
            return updatedLanguage;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteLanguageInfo(id: any) {
        try {
            const deletedLanguage = await prisma.language.delete({
                where: {
                    id: id
                }
            });
            return deletedLanguage;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
