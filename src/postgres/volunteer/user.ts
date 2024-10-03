import { PrismaClient, Volunteer } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
}

export class EditVolunteer {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }

    async addInfo(volunteerInfo: Omit<Volunteer, 'id' | 'userId'>): Promise<Volunteer> {
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
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo(): Promise<Volunteer[]> {
        try {
            const infoExists = await prisma.volunteer.findMany({
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

    async updateVolunteerInfo(fields: Partial<Omit<Volunteer, 'id' | 'userId'>>, id: string): Promise<Volunteer> {
        try {
            const updatedVolunteer = await prisma.volunteer.update({
                where: { id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
                }
            });
            return updatedVolunteer;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteVolunteerInfo(id: string): Promise<Volunteer> {
        try {
            const deletedVolunteer = await prisma.volunteer.delete({
                where: { id }
            });
            return deletedVolunteer;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}