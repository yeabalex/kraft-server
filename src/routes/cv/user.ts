import { Router } from "express";
import { CV } from "../../postgres/cv/user";
import { Template } from "../../postgres/templates/templates";
import {v4 as uuidv4} from 'uuid'

export const cvRoutes = Router()

cvRoutes.post('/api/create/cv/:template', async (req, res)=>{
    if (!req.user) return res.sendStatus(403);

    const templateName = req.params.template;

    const findTemplate = new Template(await req.user)
    const foundTemplate = await findTemplate.getTemplate(templateName)
    const createdCV = new CV(await req.user, foundTemplate)
    req.body.id=uuidv4()
    req.body.content=await createdCV.cvContents()
    

    return res.send(await createdCV.createCV(await req.body))

})

cvRoutes.delete('/api/delete/cv/:template', async (req, res)=>{
    if (!req.user) return res.sendStatus(403);
    
    const templateName = req.params.template;

    const findTemplate = new Template(await req.user)
    const foundTemplate = await findTemplate.getTemplate(templateName)
    const deletedCV = new CV(await req.user, foundTemplate);

    return res.send(await deletedCV.deleteCV(req.query.id))

})