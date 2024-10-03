import { request, Router } from "express";
import { EditTechnicalSkill } from "../../postgres/technical-skill/user"; 
import { body, validationResult, check } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const technicalSkillRoute = Router();

// Endpoint to add technical skill information
technicalSkillRoute.post('/api/add/technical-skill',
    check('arr.*.group')
        .notEmpty().withMessage('Group is required')
        .isString().withMessage('Group must be a string'),
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

                const editTechnicalSkill = new EditTechnicalSkill(await request.user);
                const addedTechnicalSkill = await editTechnicalSkill.addInfo(req);
                res.push(addedTechnicalSkill);
            }

            return response.json(res);
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
    check('arr.*.group')
        .notEmpty().withMessage('Group is required')
        .isString().withMessage('Group must be a string'),
    check('arr.*.skill')
        .notEmpty().withMessage('Skill is required')
        .isString().withMessage('Skill must be a string'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const updateTechnicalSkill = new EditTechnicalSkill(await request.user);
            const updatedResponse = [];

            for (const req of request.body.arr) {
                const updatedTechnicalSkill = await updateTechnicalSkill.updateTechnicalSkillInfo(req, req.id);
                updatedResponse.push(updatedTechnicalSkill);
            }

            return response.send(updatedResponse);
        } catch (error) {
            console.error("Error updating technical skill:", error);
            return response.status(500).send("Internal Server Error");
        }
    });
// Endpoint to delete technical skill information
technicalSkillRoute.delete('/api/delete/technical-skill', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteTechnicalSkill = new EditTechnicalSkill(await request.user);

    const deletedTechnicalSkill = await deleteTechnicalSkill.deleteTechnicalSkillInfo(request.query.id);

    return response.send(deletedTechnicalSkill);
});
