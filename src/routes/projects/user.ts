import { Router } from "express";
import { EditProject } from "../../postgres/projects/user"; 
import { body, validationResult, check } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const projectRoute = Router();

// Endpoint to add project information
projectRoute.post('/api/add/project',
    check('arr.*.title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
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

                const editProject = new EditProject(await request.user);
                const addedProject = await editProject.addInfo(req);
                res.push(addedProject);
            }

            return response.json(res);
        } catch (error) {
            console.error("Error adding project:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get project information
projectRoute.get('/api/user/project', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showProject = new EditProject(await request.user);
    
    return response.send(await showProject.getInfo());
});

// Endpoint to update project information
projectRoute.put('/api/update/project',
    check('arr.*.title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const updateProject = new EditProject(await request.user);
            const updatedResponse = [];

            for (const req of request.body.arr) {
                const updatedProject = await updateProject.updateProjectInfo(req, req.id);
                updatedResponse.push(updatedProject);
            }

            return response.send(updatedResponse);
        } catch (error) {
            console.error("Error updating project:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to delete project information
projectRoute.delete('/api/delete/project', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteProject = new EditProject(await request.user);

    const deletedProject = await deleteProject.deleteProjectInfo(request.query.id);

    return response.send(deletedProject);
});
