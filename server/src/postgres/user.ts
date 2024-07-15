import { PrismaClient } from "@prisma/client";
import { compare } from "../utils/hashPassword";

const prisma = new PrismaClient();

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function userExists(user: User) {
    try {
        const exists = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
        return exists ? true : false;
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

export async function createUser(user: User) {
    try {
        await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            },
        });
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

export async function login(email: string, password: string) {
    try {
        const loggedUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (loggedUser && compare(password, loggedUser.password)) {
            return loggedUser;
        }

        return null;
    } catch (err) {
        console.error("Error logging in:", err);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export async function findById(id: any) {
    const userById = prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    return userById;
}

export async function deleteAccount(email:string, password:string){
    const loggedUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (loggedUser && compare(password, loggedUser.password)) {
        const deletedAccount = await prisma.user.delete({
            where:{
                email:email
            }
        })
        return deletedAccount
    }

    return null

}

export async function findByEmail(email:string) {
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    
    return user?user:null
}

export class UpdateUserInfo {
    userId: any;
    constructor(userId:any){
        this.userId=userId
    }
    
   async updatePassword(newPassword: string){
    try{
        const updatedUser = await prisma.user.update({
            where:{id: this.userId},
            data:{password: newPassword}
        })
        return updatedUser
    }catch(err){
        console.error(err)
    }finally{
        prisma.$disconnect()
    }
    }
}