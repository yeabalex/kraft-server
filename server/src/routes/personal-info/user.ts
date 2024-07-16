import { Router } from "express";
import { EditPersonalInfo } from "../../postgres/personal-info/user";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult, matchedData } from "express-validator";

export const personalInfoRoute = Router()

personalInfoRoute.post('/api/add/personal-info',body('firstName').notEmpty().withMessage('Enter your name'),body('lastName').notEmpty().withMessage('Enter your last name'), async (request: any, response: any)=>{
    if (!request.user) return response.status(400).send('you freakin hacker');
    if(validationResult(request).array().length) return response.status(401).send(validationResult(request).array());

    
    request.body.id=uuidv4()
    const newPersonalInfo = new EditPersonalInfo(await request.user)
    
    const addedInfo = newPersonalInfo.addInfo(request.body)
    return response.send(addedInfo)

})