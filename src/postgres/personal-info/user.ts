import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class EditPersonalInfo {
    
    user:any
    
    constructor (userObject: any){
        this.user=userObject
    }

    async addInfo(userInfo: any){
       try{ 
        const addedInfo = await prisma.personalInfo.create({
            data:{
                ...userInfo, 
                user: {
                    connect: {
                        id: this.user.id
                    }
                },
                dateOfBirth: userInfo.dateOfBirth.length > 0 ? new Date(userInfo.dateOfBirth) : undefined
            }
        })

        return addedInfo
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
    }

    async getInfo(){
        try{
            const infoExists = await prisma.personalInfo.findUnique({
                where:{
                    userId: this.user.id
                }
            })   
            
            return infoExists
        }catch(err){
            console.error(err)
        }finally{
            prisma.$disconnect()
        }
    }

    async updateInfo(fields: any){
        try{
            const updatedInfo = await prisma.personalInfo.update({
                where:{userId:this.user.id},
                data:{
                    ...fields, dateOfBirth:new Date(fields.dateOfBirth)
                }
            })
            return updatedInfo
        }catch(err){
            console.error(err)
        }finally{
            prisma.$disconnect()
        }
    }

    async deletePersonalInfo(){
        try{
            const deletedInfo = await prisma.personalInfo.delete({
                where: {
                    userId: this.user.id
                }
            })
            return deletedInfo
        }catch(err){
            console.error(err)
        }finally{
            prisma.$disconnect()
        }
    }

}