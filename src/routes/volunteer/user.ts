import { Router } from "express";
import { EditVolunteer } from "../../postgres/volunteer/user"; 
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const volunteerRoute = Router();

// Endpoint to add volunteer information
volunteerRoute.post('/api/add/volunteer',
    body('organization').notEmpty().withMessage('Organization is required'),
    body('role').notEmpty().withMessage('Role is required'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editVolunteer = new EditVolunteer(await request.user);
            const addedVolunteer = await editVolunteer.addInfo(request.body);
    
            return response.json(addedVolunteer);
        } catch (error) {
            console.error("Error adding volunteer:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get volunteer information
volunteerRoute.get('/api/user/volunteers', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showVolunteers = new EditVolunteer(await request.user);
    
    return response.send(await showVolunteers.getInfo());
});

// Endpoint to update volunteer information
volunteerRoute.put('/api/update/volunteer',
    body('organization').notEmpty().withMessage('Organization is required'),
    body('role').notEmpty().withMessage('Role is required'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateVolunteer = new EditVolunteer(await request.user);

        const updatedVolunteer = await updateVolunteer.updateVolunteerInfo(request.body, request.query.id);

        return response.send(updatedVolunteer);
    });

// Endpoint to delete volunteer information
volunteerRoute.delete('/api/delete/volunteer', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteVolunteer = new EditVolunteer(await request.user);

    const deletedVolunteer = await deleteVolunteer.deleteVolunteerInfo(request.query.id);

    return response.send(deletedVolunteer);
});
