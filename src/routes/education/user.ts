import { request, Router } from "express";
import { EditEducation } from "../../postgres/education/user"; // Adjust import path as per your project structure
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const educationRoute = Router();

// Endpoint to add education information
educationRoute.post('/api/add/education',
    body('credential').notEmpty().withMessage('Credential is required'),
    body('organization').notEmpty().withMessage('Organization is required'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editEducation = new EditEducation(await request.user);
            const addedEducation = await editEducation.addInfo(request.body);
    
            return response.json(addedEducation);
        } catch (error) {
            console.error("Error adding education:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to update education information
educationRoute.get('/api/user/education', async (request:any, response:any)=>{
    if (!request.user) return response.status(400).send('Unauthorized');

    const showEducation = new EditEducation(await request.user);
    
    return response.send(await showEducation.getInfo())
})

educationRoute.put('/api/update/education', 
    body('credential').notEmpty().withMessage('Credential is required'),
    body('organization').notEmpty().withMessage('Organization is required'),    
    async (request: any, response: any)=>{
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateEducation = new EditEducation(await request.user)

        const updatedEducation = updateEducation.updateEducationInfo(request.body, request.query.id)

        return response.send(await updatedEducation)
})

educationRoute.delete('/api/delete/education', (request, response)=>{
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteEducation = new EditEducation(request.user)

    const deletedEducation = deleteEducation.deleteEducationInfo(request.query.id)

    return response.send(deletedEducation)


})