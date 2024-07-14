import express from 'express'
import { userRoute } from "./routes/account/user";
import passport from 'passport'
import session from 'express-session'

const app = express()
const PORT: any = process.env.PORT?process.env.PORT:3000
app.use(express.json())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000*60}
  }));

app.use(passport.initialize())
app.use(passport.session())
app.use(userRoute)



app.listen(PORT, ()=>{
    console.log('Server running on port', PORT)
})