import { Router } from "express";
import { EditProject } from "../../postgres/projects/user"; 
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const projectRoute = Router();

// Endpoint to add project information
projectRoute.post('/api/add/project',
    body('title').notEmpty().withMessage('Title is required'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editProject = new EditProject(await request.user);
            const addedProject = await editProject.addInfo(request.body);
    
            return response.json(addedProject);
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
    body('title').notEmpty().withMessage('Title is required'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateProject = new EditProject(await request.user);

        const updatedProject = await updateProject.updateProjectInfo(request.body, request.query.id);

        return response.send(updatedProject);
    });

// Endpoint to delete project information
projectRoute.delete('/api/delete/project', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteProject = new EditProject(await request.user);

    const deletedProject = await deleteProject.deleteProjectInfo(request.query.id);

    return response.send(deletedProject);
});
