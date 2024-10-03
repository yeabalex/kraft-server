import { request, Router } from "express";
import { EditLanguage } from "../../postgres/language-skill/user"; 
import { body, validationResult, check } from "express-validator";
import { v4 as uuidv4 } from "uuid";

const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

export const languageRoute = Router();

// Endpoint to add language information
languageRoute.post('/api/add/language',
    check('arr.*.langName')
        .notEmpty().withMessage('Language name is required')
        .isString().withMessage('Language name must be a string'),
    check('arr.*.proficiency')
        .isIn(proficiencyLevels).withMessage('Invalid proficiency level'),
    async (request: any, response: any) => {
        try {
            console.log(await request.body, "from server");
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const res = [];
            for (const req of request.body.arr) {
                req.id = uuidv4();
                //req.userId = request.user.id;

                const editLanguage = new EditLanguage(await request.user);
                const addedLanguage = await editLanguage.addInfo(req);
                res.push(addedLanguage);
            }

            return response.json(res);
        } catch (error) {
            console.error("Error adding language:", error);
            return response.status(500).send("Internal Server Error");
        }
    });
// Endpoint to get language information
languageRoute.get('/api/user/language', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showLanguage = new EditLanguage(await request.user);
    
    return response.send(await showLanguage.getInfo());
});

// Endpoint to update language information
languageRoute.put('/api/update/language',
    check('arr.*.langName')
        .notEmpty().withMessage('Language name is required')
        .isString().withMessage('Language name must be a string'),
    check('arr.*.proficiency')
        .isIn(proficiencyLevels).withMessage('Invalid proficiency level'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const updateLanguage = new EditLanguage(await request.user);
            const updatedResponse = [];

            for (const req of request.body.arr) {
                const updatedLanguage = await updateLanguage.updateLanguageInfo(req, req.id);
                updatedResponse.push(updatedLanguage);
            }

            return response.send(updatedResponse);
        } catch (error) {
            console.error("Error updating language:", error);
            return response.status(500).send("Internal Server Error");
        }
    });
// Endpoint to delete language information
languageRoute.delete('/api/delete/language', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteLanguage = new EditLanguage(await request.user);

    const deletedLanguage = await deleteLanguage.deleteLanguageInfo(request.query.id);

    return response.send(deletedLanguage);
});
