import { request, Router } from "express";
import { EditSoftSkill } from "../../postgres/soft-skills/user"; 
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const softSkillRoute = Router();

// Endpoint to add soft skill information
softSkillRoute.post('/api/add/soft-skill',
    body('skill').notEmpty().withMessage('Skill is required'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editSoftSkill = new EditSoftSkill(await request.user);
            const addedSoftSkill = await editSoftSkill.addInfo(request.body);
    
            return response.json(addedSoftSkill);
        } catch (error) {
            console.error("Error adding soft skill:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get soft skill information
softSkillRoute.get('/api/user/soft-skill', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showSoftSkill = new EditSoftSkill(await request.user);
    
    return response.send(await showSoftSkill.getInfo());
});

// Endpoint to update soft skill information
softSkillRoute.put('/api/update/soft-skill',
    body('skill').notEmpty().withMessage('Skill is required'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateSoftSkill = new EditSoftSkill(await request.user);

        const updatedSoftSkill = await updateSoftSkill.updateSoftSkillInfo(request.body, request.query.id);

        return response.send(updatedSoftSkill);
    });

// Endpoint to delete soft skill information
softSkillRoute.delete('/api/delete/soft-skill', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteSoftSkill = new EditSoftSkill(await request.user);

    const deletedSoftSkill = await deleteSoftSkill.deleteSoftSkillInfo(request.query.id);

    return response.send(deletedSoftSkill);
});
