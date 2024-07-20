import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditVolunteer {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(volunteerInfo: any) {
        try {
            const addedInfo = await prisma.volunteer.create({
                data: {
                    ...volunteerInfo,
                    user: {
                        connect: {
                            id: this.user.id
                        }
                    },
                    from: volunteerInfo.from ? new Date(volunteerInfo.from) : undefined,
                    to: volunteerInfo.to ? new Date(volunteerInfo.to) : undefined
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
            const infoExists = await prisma.volunteer.findMany({
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

    async updateVolunteerInfo(fields: any, id: any) {
        try {
            const updatedVolunteer = await prisma.volunteer.update({
                where: { id: id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
                }
            });
            return updatedVolunteer;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteVolunteerInfo(id: any) {
        try {
            const deletedVolunteer = await prisma.volunteer.delete({
                where: {
                    id: id
                }
            });
            return deletedVolunteer;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
