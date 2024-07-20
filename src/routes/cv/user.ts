import { Router } from "express";
import { CV } from "../../postgres/cv/user";
import {v4 as uuidv4} from 'uuid'
import session from "express-session";

export const cvRoutes = Router()

cvRoutes.get('/api/get/cvs', async (request, response)=>{
    if (!request.user) return response.status(403).send('Unauthorized');
    
    const cv = new CV(await request.user)

    response.send(await cv.getCV())

})``

cvRoutes.post('/api/create/cv', async (request, response)=>{
    if(!request.user) return response.status(403).send('Unauthorized');

    const newCv = new CV(await request.user)

    const cvId: any = uuidv4()
    const createdCV = newCv.createCV(request.body)

    return response.send(createdCV)


})