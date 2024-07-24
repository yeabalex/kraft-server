import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CV{
    user : any
    template: any
    constructor(user: any, template: any){
        this.user=user
        this.template=template
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
    async createCV(data: any){
        
        try{
        const createdCV = prisma.cv.create({
            data:{
                title: data.title,
                template:{
                    connect:{
                        id:this.template[0].id
                    }
                },
                user:{
                    connect:{
                        id: this.user.id
                    }
                },
                content:data.content

            }
        }) 
        return createdCV
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
    }

    async deleteCV(cvid: any){
        try{
            const deletedCV = await prisma.cv.delete({
                where:{
                    id: cvid
                }
            })
            return deletedCV
        }catch(err){
            console.error(err)
        }finally{
            prisma.$disconnect()
        }
    }
}