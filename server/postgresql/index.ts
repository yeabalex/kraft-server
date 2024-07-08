import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export async function createUser(userData: UserData) {
   try{ 
    await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      },
    })
}catch(err){
    console.error(err)
}finally{
    prisma.$disconnect()
}
}
