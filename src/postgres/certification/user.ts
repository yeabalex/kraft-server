import { PrismaClient, Certification } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
}

export class EditCertification {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }       
        
    async addInfo(certificationInfo: Omit<Certification, 'id' | 'userId'>): Promise<Certification> {
        try {
            const addedInfo = await prisma.certification.create({
                data: {
                    ...certificationInfo,
                    user: {
                        connect: {
                            id: this.user.id,
                        }
                    },
                    from: certificationInfo.from ? new Date(certificationInfo.from) : undefined,
                    to: certificationInfo.to ? new Date(certificationInfo.to) : undefined
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

    async getInfo(): Promise<Certification[]> {
        try {
            const infoExists = await prisma.certification.findMany({
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

    async updateCertificationInfo(fields: Partial<Omit<Certification, 'id' | 'userId'>>, id: string): Promise<Certification> {
        try {
            const updatedCertification = await prisma.certification.update({
                where: { id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
                }
            });
            return updatedCertification;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteCertificationInfo(id: string): Promise<Certification> {
        try {
            const deletedCertification = await prisma.certification.delete({
                where: { id }
            });
            return deletedCertification;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}