import { Router } from "express";
import { EditVolunteer } from "../../postgres/volunteer/user"; 
import { body, validationResult, check } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const volunteerRoute = Router();

// Endpoint to add volunteer information
volunteerRoute.post('/api/add/volunteer',
    check('arr.*.organization')
        .notEmpty().withMessage('Organization is required')
        .isString().withMessage('Organization must be a string'),
    check('arr.*.role')
        .notEmpty().withMessage('Role is required')
        .isString().withMessage('Role must be a string'),
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

                const editVolunteer = new EditVolunteer(await request.user);
                const addedVolunteer = await editVolunteer.addInfo(req);
                res.push(addedVolunteer);
            }

            return response.json(res);
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
    check('arr.*.organization')
        .notEmpty().withMessage('Organization is required')
        .isString().withMessage('Organization must be a string'),
    check('arr.*.role')
        .notEmpty().withMessage('Role is required')
        .isString().withMessage('Role must be a string'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const updateVolunteer = new EditVolunteer(await request.user);
            const updatedResponse = [];

            for (const req of request.body.arr) {
                const updatedVolunteer = await updateVolunteer.updateVolunteerInfo(req, req.id);
                updatedResponse.push(updatedVolunteer);
            }

            return response.send(updatedResponse);
        } catch (error) {
            console.error("Error updating volunteer:", error);
            return response.status(500).send("Internal Server Error");
        }
    });
// Endpoint to delete volunteer information
volunteerRoute.delete('/api/delete/volunteer', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteVolunteer = new EditVolunteer(await request.user);

    const deletedVolunteer = await deleteVolunteer.deleteVolunteerInfo(request.query.id);

    return response.send(deletedVolunteer);
});
