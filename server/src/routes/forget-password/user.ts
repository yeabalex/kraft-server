import { Router } from "express";
import { userExists } from "../../postgres/user";
import nodemailer from 'nodemailer';
import session from "express-session";
import { findByEmail } from "../../postgres/user";
import { hash } from "../../utils/hashPassword";
import { UpdateUserInfo } from "../../postgres/user";
import { body, validationResult } from "express-validator";

export const forgotPassword = Router();

forgotPassword.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 10000 } 
}));

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "yeabsiraalemu@hotmail.com",
    pass: "@Ybxth3hotmailbro",
  },
  tls: {
  
  }
});

let sixDigitNumber: number;
let count = 0;
let countInterval: string | number | NodeJS.Timeout | undefined;

forgotPassword.post('/api/account/forget-password', async (request: any, response: any) => {
  clearInterval(countInterval);

  countInterval = setInterval(() => { count = 0 }, 60 * 60 * 1000);

  if (count < 3) {
    if (await userExists(request.body)) {
      sixDigitNumber = Math.floor(100000 + Math.random() * 900000);
      const mail = {
        from: 'yeabsiraalemu@hotmail.com',
        to: request.body.email,
        subject: 'Reset Password',
        text: `Here is your verification code ${sixDigitNumber}`
      };

      transporter.sendMail(mail, function (error, info) {
        if (error) {
          console.error('Email failed to send:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      request.session.userInfo = {verificationCode: sixDigitNumber, email: request.body.email};
      count++;
      return response.status(201).send('Verify your email');
    }

    return response.status(401).send('Invalid email');
  }

  return response.status(429).send('Limit exceeded, try again in one hour');
});

const verificationNumberMiddleware = (request: any, response: any, next: any) => {
  if (request.body.verificationCode === request.session.userInfo.verificationCode) {

    return next();
  }

  return response.status(403).send('Code does not match');
}

forgotPassword.post('/api/account/verify', verificationNumberMiddleware, (request: any, response: any) => {
  request.session.user
  response.sendStatus(200);
});

forgotPassword.patch('/api/account/change-password',body('newPassword').notEmpty().withMessage('Password can not be empty').isString().withMessage('Password must be a string').isLength({min: 8}).withMessage('Minimum 8 characters').matches(/^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/), async (request:any, response:any)=>{
  
  const result = validationResult(request);
  if (result.array().length) return response.send(result.array());

  const user = await findByEmail(request.session.userInfo.email);

  if(user){
    const updateUser = new UpdateUserInfo(user.id)
    updateUser.updatePassword(hash(request.body.newPassword))
    return response.status(200).send('updated')
  }

  return response.sendStatus(400)
})