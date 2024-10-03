import { PrismaClient, Language } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
}

export class EditLanguage {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }

    async addInfo(languageInfo: Omit<Language, 'id' | 'userId'>): Promise<Language> {
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
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo(): Promise<Language[]> {
        try {
            const infoExists = await prisma.language.findMany({
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

    async updateLanguageInfo(fields: Partial<Omit<Language, 'id' | 'userId'>>, id: string): Promise<Language> {
        try {
            const updatedLanguage = await prisma.language.update({
                where: { id },
                data: {
                    ...fields
                }
            });
            return updatedLanguage;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteLanguageInfo(id: string): Promise<Language> {
        try {
            const deletedLanguage = await prisma.language.delete({
                where: { id }
            });
            return deletedLanguage;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}