import { Router } from "express";
import { EditTestResult } from "../../postgres/test-result/user"; // Adjust import path as per your project structure
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const testResultRoute = Router();

// Endpoint to add test result information
testResultRoute.post('/api/add/test-result',
    body('testName').notEmpty().withMessage('Test name is required'),
    body('score').isFloat({ min: 0 }).withMessage('Score must be a positive number'),
    body('dateTaken').isISO8601().withMessage('Date must be in ISO 8601 format'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
    
            request.body.id = uuidv4();
            request.body.userId = request.user.id;
    
            const editTestResult = new EditTestResult(await request.user);
            const addedTestResult = await editTestResult.addInfo(request.body);
    
            return response.json(addedTestResult);
        } catch (error) {
            console.error("Error adding test result:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get test result information
testResultRoute.get('/api/user/test-results', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showTestResults = new EditTestResult(await request.user);
    
    return response.send(await showTestResults.getInfo());
});

// Endpoint to update test result information
testResultRoute.put('/api/update/test-result',
    body('testName').notEmpty().withMessage('Test name is required'),
    body('score').isFloat({ min: 0 }).withMessage('Score must be a positive number'),
    body('dateTaken').isISO8601().withMessage('Date must be in ISO 8601 format'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateTestResult = new EditTestResult(await request.user);

        const updatedTestResult = await updateTestResult.updateTestResultInfo(request.body, request.query.id);

        return response.send(updatedTestResult);
    });

// Endpoint to delete test result information
testResultRoute.delete('/api/delete/test-result', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteTestResult = new EditTestResult(await request.user);

    const deletedTestResult = await deleteTestResult.deleteTestResultInfo(request.query.id);

    return response.send(deletedTestResult);
});
