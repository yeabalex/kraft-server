import { Router } from "express";
import { createUser } from "../../postgres/user";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { signUpSchema } from "../../utils/signUpValidation";
import { userExists } from "../../postgres/user";
import { hash } from "../../utils/hashPassword";
import { v4 as uuidv4 } from 'uuid';
import passport from "../../auth/local";

export const userRoute = Router()

userRoute.post('/api/auth/signup',checkSchema(signUpSchema), async (request:any,response:any)=>{
    const result = validationResult(request)
    if(result.array().length) return response.send(result.array())
    const userData:any = matchedData(request)
    if(await userExists(userData)) return response.status(401).send('User exists');
    userData.id=uuidv4()
    userData.password=hash(userData.password)

    createUser(userData)

    return response.status(200).send('created')

})

userRoute.post('/api/auth/login', passport.authenticate('local'), (request:any, response:any)=>{
    response.sendStatus(200)
})
userRoute.get('/api/auth/login/status', async (request:any, response:any)=>{
    response.status(200).send(await request.user)
})


userRoute.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Failed to log out.');
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Failed to destroy session.');
            }
            res.clearCookie('connect.sid', { path: '/api/auth/' });
            res.status(200).send('Logged out successfully.');
        });
    });
});

