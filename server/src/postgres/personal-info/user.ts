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
                id: userInfo.id,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                dateOfBirth: new Date(userInfo.dateOfBirth),
                aboutMe: userInfo.aboutMe,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                linkedin: userInfo.linkedin,
                website: userInfo.website,
                addressLine1: userInfo.addressLine1,
                addressLine2: userInfo.addressLine2,
                city: userInfo.city,
                country: userInfo.country,
                image: userInfo.image,
                user: {
                    connect: {
                        id: this.user.id
                    }
                }
            }
        })

        return addedInfo
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
    }

    async updateInfo(fields: any){
        
    }

}