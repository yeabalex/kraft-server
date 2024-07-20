import { request, Router } from "express";
import { EditTechnicalSkill } from "../../postgres/technical-skill/user"; // Adjust import path as per your project structure
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const technicalSkillRoute = Router();

// Endpoint to add technical skill information
technicalSkillRoute.post('/api/add/technical-skill',
    body('group').notEmpty().withMessage('Group is required'),
    body('skill').notEmpty().withMessage('Skill is required'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editTechnicalSkill = new EditTechnicalSkill(await request.user);
            const addedTechnicalSkill = await editTechnicalSkill.addInfo(request.body);
    
            return response.json(addedTechnicalSkill);
        } catch (error) {
            console.error("Error adding technical skill:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get technical skill information
technicalSkillRoute.get('/api/user/technical-skill', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showTechnicalSkill = new EditTechnicalSkill(await request.user);
    
    return response.send(await showTechnicalSkill.getInfo());
});

// Endpoint to update technical skill information
technicalSkillRoute.put('/api/update/technical-skill',
    body('group').notEmpty().withMessage('Group is required'),
    body('skill').notEmpty().withMessage('Skill is required'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateTechnicalSkill = new EditTechnicalSkill(await request.user);

        const updatedTechnicalSkill = await updateTechnicalSkill.updateTechnicalSkillInfo(request.body, request.query.id);

        return response.send(updatedTechnicalSkill);
    });

// Endpoint to delete technical skill information
technicalSkillRoute.delete('/api/delete/technical-skill', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteTechnicalSkill = new EditTechnicalSkill(await request.user);

    const deletedTechnicalSkill = await deleteTechnicalSkill.deleteTechnicalSkillInfo(request.query.id);

    return response.send(deletedTechnicalSkill);
});
