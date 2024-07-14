import { Router } from "express";
import { createUser } from "../postgres/user";
import { checkSchema, matchedData } from "express-validator";
import { signUpSchema } from "../utils/signUpValidation";
import { userExists } from "../postgres/user";
import { hash } from "../utils/hashPassword";
import { v4 as uuidv4 } from 'uuid';
import passport from "../auth/local";
import { send } from "vite";

export const userRoute = Router()

userRoute.post('/api/auth/signup',checkSchema(signUpSchema), async (request:any,response:any)=>{
    const userData:any = matchedData(request)
    if(await userExists(userData)) return response.status(401).send('User exists')
    userData.id=uuidv4()
    userData.password=hash(userData.password)

    createUser(userData)

    return response.status(200).send('created')

})

userRoute.post('/api/auth/login', passport.authenticate('local'), (request:any, response:any)=>{
    response.sendStatus(200)
})
userRoute.get('/api/auth/login/status', async (request:any, response:any)=>{
    response.status(200).send(await request.user)
})