import { request, Router } from "express";
import { EditWorkExperience } from "../../postgres/work-experience/user"; 
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const workExperienceRoute = Router();

// Endpoint to add work experience information
workExperienceRoute.post('/api/add/work-experience',
    body('position').notEmpty().withMessage('Position is required'),
    body('company').notEmpty().withMessage('Company is required'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editWorkExperience = new EditWorkExperience(await request.user);
            const addedWorkExperience = await editWorkExperience.addInfo(request.body);
    
            return response.json(addedWorkExperience);
        } catch (error) {
            console.error("Error adding work experience:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get work experience information
workExperienceRoute.get('/api/user/work-experience', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showWorkExperience = new EditWorkExperience(await request.user);
    
    return response.send(await showWorkExperience.getInfo());
});

// Endpoint to update work experience information
workExperienceRoute.put('/api/update/work-experience',
    body('position').notEmpty().withMessage('Position is required'),
    body('company').notEmpty().withMessage('Company is required'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateWorkExperience = new EditWorkExperience(await request.user);

        const updatedWorkExperience = await updateWorkExperience.updateWorkExperienceInfo(request.body, request.query.id);

        return response.send(updatedWorkExperience);
    });

// Endpoint to delete work experience information
workExperienceRoute.delete('/api/delete/work-experience', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteWorkExperience = new EditWorkExperience(await request.user);

    const deletedWorkExperience = await deleteWorkExperience.deleteWorkExperienceInfo(request.query.id);

    return response.send(deletedWorkExperience);
});
