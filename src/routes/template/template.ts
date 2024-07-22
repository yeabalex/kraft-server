import { Router } from "express";
import { EditPersonalInfo } from "../../postgres/personal-info/user";
import { CV } from "../../postgres/cv/user";

export const templateRoute = Router();

templateRoute.get('/api/templates/:templateName', async (request, response) => {
    const templateName = request.params.templateName
    const cv = new EditPersonalInfo(await request.user);
    const content = await cv.getInfo()
   
    const s = new CV(await request.user)

    const data = await s.cvContents()
    const jsonData = await JSON.parse(data)
    console.log(jsonData[0])
    
 
    
    response.render(`template-1/${templateName}`, {...jsonData[0]});
});