import { Router } from "express";
import { EditPersonalInfo } from "../../postgres/personal-info/user";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult, matchedData } from "express-validator";

export const personalInfoRoute = Router()

personalInfoRoute.post('/api/add/personal-info',body('firstName').notEmpty().withMessage('Enter your name'),body('lastName').notEmpty().withMessage('Enter your last name'), async (request: any, response: any)=>{
    if (!await request.user) return response.status(400).send('you freakin hacker');
    if(validationResult(request).array().length) return response.status(401).send(validationResult(request).array());

    
    request.body.id=uuidv4()
    const newPersonalInfo = new EditPersonalInfo(await request.user)
    
    const addedInfo = newPersonalInfo.addInfo(request.body)
    return response.send(addedInfo)

})

personalInfoRoute.put('/api/update/personal-info',body('firstName').notEmpty().withMessage('Enter your name'),body('lastName').notEmpty().withMessage('Enter your last name'), async (request: any, response: any)=>{
    if (!await request.user) return response.status(400).send('you freakin hacker');


    if(validationResult(request).array().length) return response.status(401).send(validationResult(request).array());
    const updatePersonalInfo = new EditPersonalInfo(await request.user)

    if(!await updatePersonalInfo.getInfo()) return response.status(403).send("No personal info");
    
    updatePersonalInfo.updateInfo(request.body)

    return response.status(200).send('updated')

})

personalInfoRoute.delete('/api/delete/personal-info', async (request: any, response: any)=>{
    if (!await request.user) return response.status(400).send('you freakin hacker');

    const deletePersonalInfo = new EditPersonalInfo(await request.user)

    deletePersonalInfo.deletePersonalInfo()

    return response.status(200).send('deleted')

})


