import express from 'express'
import { userRoute } from "./routes/account/user";
import passport from 'passport'
import session from 'express-session'
import { forgotPassword } from './routes/forget-password/user';

const app = express()
const PORT: any = process.env.PORT?process.env.PORT:3000
app.use(express.json())
app.use(session({
    secret: 'iamyeabsira',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000*60}
  }));

app.use(passport.initialize())
app.use(passport.session())
app.use(userRoute)
app.use(forgotPassword)



app.listen(PORT, ()=>{
    console.log('Server running on port', PORT)
})