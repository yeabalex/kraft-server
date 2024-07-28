import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class EditEducation {
    user: any;

    constructor(userObject: any) {
        this.user = userObject;
    }

    async addInfo(educationInfo: any) {
        try {
            const addedInfo = await prisma.education.create({
                data: {
                    ...educationInfo,
                    user: {
                        connect: {
                            id: this.user.id,
                        }
                    },
                    from: educationInfo.from ? new Date(educationInfo.from) : undefined,
                    to: educationInfo.to ? new Date(educationInfo.to) : undefined,
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
            const infoExists = await prisma.education.findMany({
                where: {
                    userId: this.user.id,

                }
            });
            return infoExists
        } catch (err) {
            console.error(err);
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateEducationInfo(fields: any, id: any){
        try{
            const updatedEducation = await prisma.education.update({
                where:{id: id},
                data:{
                    ...fields,
                    from: fields.from ? new Date(fields.from) : undefined,
                    to: fields.to ? new Date(fields.to) : undefined                    
                }
            })
            return updatedEducation
        }catch(err){
            console.error(err)
        }finally{
            prisma.$disconnect()
        }
    }

    async deleteEducationInfo(id: any){
       try{ 
        const deletedEducation = await prisma.education.delete({
            where: {
                id:id
            }
        })
        return deletedEducation
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
}
}
