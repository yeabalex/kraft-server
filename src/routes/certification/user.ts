import { request, Router } from "express";
import { EditCertification } from "../../postgres/certification/user"; // Adjust import path as per your project structure
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const certificationRoute = Router();

// Endpoint to add certification information
certificationRoute.post('/api/add/certification',
    body('name').notEmpty().withMessage('Name is required'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editCertification = new EditCertification(await request.user);
            const addedCertification = await editCertification.addInfo(request.body);
    
            return response.json(addedCertification);
        } catch (error) {
            console.error("Error adding certification:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get certification information
certificationRoute.get('/api/user/certification', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showCertification = new EditCertification(await request.user);
    
    return response.send(await showCertification.getInfo());
});

// Endpoint to update certification information
certificationRoute.put('/api/update/certification',
    body('name').notEmpty().withMessage('Name is required'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateCertification = new EditCertification(await request.user);

        const updatedCertification = await updateCertification.updateCertificationInfo(request.body, request.query.id);

        return response.send(updatedCertification);
    });

// Endpoint to delete certification information
certificationRoute.delete('/api/delete/certification', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteCertification = new EditCertification(await request.user);

    const deletedCertification = await deleteCertification.deleteCertificationInfo(request.query.id);

    return response.send(deletedCertification);
});
