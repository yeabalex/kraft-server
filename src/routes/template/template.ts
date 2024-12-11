import { Router } from "express";
import { EditPersonalInfo } from "../../postgres/personal-info/user";
import { CV } from "../../postgres/cv/user";
import { Template } from "../../postgres/templates/templates";
import {v4 as uuidv4} from 'uuid'
import { body, validationResult } from "express-validator";

export const templateRoute = Router();

templateRoute.use((error:any, req:any, res:any, next:any) => {
    console.error('Unhandled error:', error);
    res.status(500).send('An unexpected error occurred');
});
templateRoute.get('/api/templates', async (req, res)=>{
    if(!req.user) return res.sendStatus(403);

    const templates = new Template(await req.user)

    const templateArray = await templates.getAllTemplates()
    res.send(templateArray)
    
})

templateRoute.get('/api/templates/:templateName', async (request, response)=> {
	if(!request.user) return response.sendStatus(403);

    const templateName = request.params.templateName
    const cv = new EditPersonalInfo(await request.user);
    const getTemplate = new Template(await request.user);
    
    const s = new CV(await request.user, await getTemplate.getTemplate(templateName))

    const data = await s.cvContents()
    const jsonData = await JSON.parse(data)
   // console.log(jsonData[0])
    
    response.render(`template-1/${templateName}`, {...jsonData[0]});
    return response.json(jsonData); 
});

templateRoute.post('/api/add/template',body('name').notEmpty().isString(), async (req, res)=>{
    if(!req.user) return res.sendStatus(403);

    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).send(result.array());


    const addedTemplate = new Template(await req.user);

    req.body.id=uuidv4()

    const template = addedTemplate.addTemplate(req.body)

    return res.status(200).send(await template)


})
