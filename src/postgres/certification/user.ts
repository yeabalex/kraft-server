import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditCertification {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }       
        
    async addInfo(certificationInfo: any) {
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
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo() {
        try {
            const infoExists = await prisma.certification.findMany({
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

    async updateCertificationInfo(fields: any, id: any) {
        try {
            const updatedCertification = await prisma.certification.update({
                where: { id: id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
                }
            });
            return updatedCertification;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteCertificationInfo(id: any) {
        try {
            const deletedCertification = await prisma.certification.delete({
                where: {
                    id: id
                }
            });
            return deletedCertification;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
