import { Router } from "express";
import { createUser, userExists } from "../../postgres/account/user";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { signUpSchema } from "../../utils/signUpValidation";
import { hash } from "../../utils/hashPassword";
import { v4 as uuidv4 } from "uuid";
import passport from "../../auth/local";
import { deleteAccount } from "../../postgres/account/user";

export const userRoute = Router();

userRoute.post('/api/auth/signup', checkSchema(signUpSchema), async (request: any, response: any) => {
    const result = validationResult(request);
    if (result.array().length) return response.send(result.array());
    
    const userData: any = matchedData(request);
    if (await userExists(userData)) return response.status(401).send('User exists');
    
    userData.id = uuidv4();
    userData.password = hash(userData.password);

    await createUser(userData);

    return response.sendStatus(200);
});

userRoute.post('/api/auth/login', passport.authenticate('local'), (request: any, res: any) => {
    
    res.sendStatus(200);
});

userRoute.get('/api/auth/login/status', async (request: any, response: any) => {
    if(!await request.user) return response.sendStatus(401);
    response.status(200).send(await request.user);
});

userRoute.post('/api/auth/logout', (request:any, response:any) => {
    request.logout((err:any) => {
        if (err) {
            return response.status(500).send('Failed to log out.');
        }
        request.session.destroy((err:any) => {
            if (err) {
                return response.status(500).send('Failed to destroy session.');
            }
            response.clearCookie('connect.sid', { path: '/api/auth/' });
            response.status(200).send('Logged out successfully.');
        });
    });
});

userRoute.delete('/api/auth/delete',async (request: any, response: any)=>{
    const sess = await request.user
    
    if (!sess){
       return response.status(403).send("Session expired")
    }

    const deletedAccount = deleteAccount(sess.email, request.body.password)

    return response.status(200).send(deletedAccount)

})
