import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CV{
    user : any

    constructor(user: any){
        this.user=user
    }

    async cvContents() {
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
        return JSON.stringify(cvData, null, 2)
    }catch(err){
        console.error(err)
        return 'nil'
    }finally{
        prisma.$disconnect()
    }
    }

}