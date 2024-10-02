import { request, Router } from "express";
import { EditCertification } from "../../postgres/certification/user"; // Adjust import path as per your project structure
import { body, validationResult, check } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const certificationRoute = Router();

// Endpoint to add certification information
certificationRoute.post('/api/add/certification',
    check('arr.*.name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
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

                const editCertification = new EditCertification(await request.user);
                const addedCertification = await editCertification.addInfo(req);
                res.push(addedCertification);
            }

            return response.json(res);
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
    check('arr.*.name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const updateCertification = new EditCertification(await request.user);
            const updatedResponse = [];

            for (const req of request.body.arr) {
                const updatedCertification = await updateCertification.updateCertificationInfo(req, req.id);
                updatedResponse.push(updatedCertification);
            }

            return response.send(updatedResponse);
        } catch (error) {
            console.error("Error updating certification:", error);
            return response.status(500).send("Internal Server Error");
        }
    });
// Endpoint to delete certification information
certificationRoute.delete('/api/delete/certification', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteCertification = new EditCertification(await request.user);

    const deletedCertification = await deleteCertification.deleteCertificationInfo(request.query.id);

    return response.send(deletedCertification);
});
