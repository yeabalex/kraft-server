import { PrismaClient, Project } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
    id: string;
}

export class EditProject {
    user: User;

    constructor(userObject: User) {
        this.user = userObject;
    }

    async addInfo(projectInfo: Omit<Project, 'id' | 'userId'>): Promise<Project> {
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
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getInfo(): Promise<Project[]> {
        try {
            const infoExists = await prisma.project.findMany({
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

    async updateProjectInfo(fields: Partial<Omit<Project, 'id' | 'userId'>>, id: string): Promise<Project> {
        try {
            const updatedProject = await prisma.project.update({
                where: { id },
                data: {
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined
                }
            });
            return updatedProject;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteProjectInfo(id: string): Promise<Project> {
        try {
            const deletedProject = await prisma.project.delete({
                where: { id }
            });
            return deletedProject;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}
