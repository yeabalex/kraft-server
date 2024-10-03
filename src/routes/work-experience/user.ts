import { request, Router } from "express";
import { EditWorkExperience } from "../../postgres/work-experience/user"; 
import { body, validationResult,check } from "express-validator";
import { v4 as uuidv4 } from "uuid";

export const workExperienceRoute = Router();

// Endpoint to add work experience information
workExperienceRoute.post('/api/add/work-experience',  check('arr.*.position')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),  check('arr.*.company')
    .notEmpty().withMessage('Company is required')
    .isString().withMessage('Com must be a string'),
    async (request: any, response: any) => {
        try {
		console.log(await request.body, "from server")
            if (!request.user) return response.status(400).send('Unauthorized');
    
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
	    const res = [];
    for(const req of request.body.arr){
            req.id = uuidv4();
            //req.userId = request.user.id;
    
            const editWorkExperience = new EditWorkExperience(await request.user);
            const addedWorkExperience = await editWorkExperience.addInfo(req);
	    res.push(addedWorkExperience)
    }
            return response.json(res);
        } catch (error) {
            console.error("Error adding work experience:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

// Endpoint to get work experience information
workExperienceRoute.get('/api/user/work-experience', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const showWorkExperience = new EditWorkExperience(await request.user);
    
    return response.send(await showWorkExperience.getInfo());
});

// Endpoint to update work experience information
workExperienceRoute.put('/api/update/work-experience',
    check('arr.*.position')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),  check('arr.*.company')
    .notEmpty().withMessage('Company is required')
    .isString().withMessage('Com must be a string'),
    async (request: any, response: any) => {
        if (!request.user) return response.status(400).send('Unauthorized');

        const updateWorkExperience = new EditWorkExperience(await request.user);
	const updatedResponse = [];
	for(const req of request.body.arr){
        const updatedWorkExperience = await updateWorkExperience.updateWorkExperienceInfo(req, req.id);
	updatedResponse.push(updatedWorkExperience);
	}
        return response.send(updatedResponse);
    });

// Endpoint to delete work experience information
workExperienceRoute.delete('/api/delete/work-experience', async (request: any, response: any) => {
    if (!request.user) return response.status(400).send('Unauthorized');

    const deleteWorkExperience = new EditWorkExperience(await request.user);

    const deletedWorkExperience = await deleteWorkExperience.deleteWorkExperienceInfo(request.query.id);

    return response.send(deletedWorkExperience);
});
