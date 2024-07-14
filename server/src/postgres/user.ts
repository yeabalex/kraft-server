import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export async function userExists(user: User){
    const exists = await prisma.user.findUnique({
        where:{
            email:user.email
        }
    })
    return exists?true:false
}

export async function createUser(user: User){
    try{
       await prisma.user.create({
            data:{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            }
        })
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
}