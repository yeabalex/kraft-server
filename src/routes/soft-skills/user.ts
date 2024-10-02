import { request, Router } from "express";
import { EditSoftSkill } from "../../postgres/soft-skills/user"; 
import { body, validationResult, check } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const softSkillRoute = Router();

// Endpoint to add soft skill information
softSkillRoute.post('/api/add/soft-skill',
    check('arr.*.skill')
        .notEmpty().withMessage('Skill is required')
        .isString().withMessage('Skill must be a string'),
    async (request: any, response: any) => {
        try {
            console.log(await request.body, "from server");
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const res = [];
            for (const req of request.body.arr) {
                req.id = uuidv4();
                req.userId = request.user.id;

                const editSoftSkill = new EditSoftSkill(await request.user);
                const addedSoftSkill = await editSoftSkill.addInfo(req);
                res.push(addedSoftSkill);
            }

            return response.json(res);
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
    check('arr.*.skill')
        .notEmpty().withMessage('Skill is required')
        .isString().withMessage('Skill must be a string'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const updateSoftSkill = new EditSoftSkill(await request.user);
            const updatedResponse = [];

            for (const req of request.body.arr) {
                const updatedSoftSkill = await updateSoftSkill.updateSoftSkillInfo(req, req.id);
                updatedResponse.push(updatedSoftSkill);
            }

            return response.send(updatedResponse);
        } catch (error) {
            console.error("Error updating soft skill:", error);
            return response.status(500).send("Internal Server Error");
        }
    });
// Endpoint to delete soft skill information
softSkillRoute.delete('/api/delete/soft-skill', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteSoftSkill = new EditSoftSkill(await request.user);

    const deletedSoftSkill = await deleteSoftSkill.deleteSoftSkillInfo(request.query.id);

    return response.send(deletedSoftSkill);
});
