import { request, response, Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { signUpSchema } from "../utils/signUpValidation";
import { hash } from "../utils/hashPassword";
import { createUser } from "../../postgresql";

export const userRoute = Router()

interface UserData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

userRoute.post('/api/auth/signup', checkSchema(signUpSchema),(request: any, response: any)=>{
        const result = validationResult(request)

        if(!result.isEmpty()) return response.status(401).send(result.array());
        
        const userData:UserData = matchedData(request)
        userData.password = hash(userData.password)
        
        createUser(userData)
        

        return response.sendStatus(200);
})
