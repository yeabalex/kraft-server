import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EditProject {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(projectInfo: any) {
        try {
            const addedInfo = await prisma.project.create({
                data: {
                    ...projectInfo,
                    user: {
                        connect: {
                            id: this.user.id
                        }
                    },
                    from: projectInfo.from ? new Date(projectInfo.from) : undefined,
                    to: projectInfo.to ? new Date(projectInfo.to) : undefined
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
            const infoExists = await prisma.project.findMany({
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

    async updateProjectInfo(fields: any, id: any) {
        try {
            const updatedProject = await prisma.project.update({
                where: { id: id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
                }
            });
            return updatedProject;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteProjectInfo(id: any) {
        try {
            const deletedProject = await prisma.project.delete({
                where: {
                    id: id
                }
            });
            return deletedProject;
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}
