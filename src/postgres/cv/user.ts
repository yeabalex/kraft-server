import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CV{
    user : any

    constructor(user: any){
        this.user=user
    }

   private async cvContents(){
        try{
        const cvData = await prisma.user.findMany({
            where:{
                id: this.user.id
                
            },
            include:{
                certifications: true,
                educations: true,
                languages: true,
                personalInfo: true,
                projects: true,
                softSkills: true,
                technicalSkills: true,
                testResults: true,
                volunteers: true,
                workExperiences: true,
            }
        })
        return cvData
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
    }

    async createCV(cvBody: any){
        const createdCV = await prisma.cv.create({
            data:{
                title: cvBody.title,
                id: cvBody.id,
                user: {
                    connect: {
                        id: this.user.id
                    }
                },
                content: await this.cvContents()?this.cvContents.toString():'Not available'
            }
        })

        
        return createdCV
    }

    async getCV(){
        const cv = await prisma.cv.findUnique({
            where:{
                id: this.user.id
            }
        })
        return cv
    }

    async updateCV(fields: any){
        const updatedCV = prisma.cv.update({
            where: {
                id: this.user.id
            },
            data:{
                ...fields
            }
        })
    }
    
}