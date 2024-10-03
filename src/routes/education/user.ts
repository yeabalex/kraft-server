import { request, Router } from "express";
import { EditEducation } from "../../postgres/education/user"; // Adjust import path as per your project structure
import { body, validationResult, check } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { User } from "@prisma/client";

export const educationRoute = Router();

// Endpoint to add education information
educationRoute.post('/api/add/education',
  check('arr.*.credential')
    .notEmpty().withMessage('Credential is required')
    .isString().withMessage('Credential must be a string'),
  check('arr.*.organization')
    .notEmpty().withMessage('Organization is required')
    .isString().withMessage('Organization must be a string'),
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

        const editEducation = new EditEducation(await request.user);
        const addedEducation = await editEducation.addInfo(req);
        res.push(addedEducation);
      }

      return response.json(res);
    } catch (error) {
      console.error("Error adding education:", error);
      return response.status(500).send("Internal Server Error");
    }
  });
// Endpoint to update education information
educationRoute.get('/api/user/education', async (request:any, response:any)=>{
    if (!request.user) return response.status(400).send('Unauthorized');

    const showEducation = new EditEducation(await request.user);
    
    return response.send(await showEducation.getInfo())
})

educationRoute.put('/api/update/education',
    check('arr.*.credential')
        .notEmpty().withMessage('Credential is required')
        .isString().withMessage('Credential must be a string'),
    check('arr.*.organization')
        .notEmpty().withMessage('Organization is required')
        .isString().withMessage('Organization must be a string'),
    async (request: any, response: any) => {
        try {
            if (!request.user) return response.status(400).send('Unauthorized');

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

            const updateEducation = new EditEducation(await request.user);
            const updatedResponse = [];

            for (const req of request.body.arr) {
                const updatedEducation = await updateEducation.updateEducationInfo(req, req.id);
                updatedResponse.push(updatedEducation);
            }

            return response.send(updatedResponse);
        } catch (error) {
            console.error("Error updating education:", error);
            return response.status(500).send("Internal Server Error");
        }
    });

educationRoute.delete('/api/delete/education',async (request, response)=>{
    if (!request.user) return response.status(401).send('Unauthorized');

    const deleteEducation = new EditEducation(request.user as User);

    const deletedEducation = await deleteEducation.deleteEducationInfo(request.query.id as string);

    return response.json(deletedEducation);


})
