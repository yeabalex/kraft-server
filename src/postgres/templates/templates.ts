import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class Template {
    user: any

    constructor(user:any){
        this.user=user
    }

    async addTemplate(data: any){
        try{
        const addedTemplate = await prisma.template.create({
            data:{
                ...data
            }
        })
        return addedTemplate
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
    }

    async getAllTemplates(){
        try{
        const allTemplates = await prisma.template.findMany()
        return allTemplates
        }catch(err){
            console.error(err)
        }finally{
            prisma.$disconnect()
        }
    }
    
    async getTemplate(templateName: string){
        try{
            const foundTemplate = await prisma.template.findMany({
                where:{
                    name:templateName
                }
            })
            return foundTemplate;
        }catch(err){
            console.error(err)
        }finally{
            prisma.$disconnect()
        }
    }
}