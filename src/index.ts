import express from 'express'
import { userRoute } from "./routes/account/user";
import passport from 'passport'
import session from 'express-session'
import { forgotPassword } from './routes/forget-password/user';
import { personalInfoRoute } from './routes/personal-info/user';
import { educationRoute } from './routes/education/user';
import { workExperienceRoute } from './routes/work-experience/user';
import { technicalSkillRoute } from './routes/technical-skill/user';
import { softSkillRoute } from './routes/soft-skills/user';
import { certificationRoute } from './routes/certification/user';
import { languageRoute } from './routes/language-skill/user';
import { projectRoute } from './routes/projects/user';
import { testResultRoute } from './routes/test-result/user';
import { volunteerRoute } from './routes/volunteer/user';
import { cvRoutes } from './routes/cv/user';
import { templateRoute } from './routes/template/template';
import cors from 'cors'


const path = require('path')

const app = express()
const PORT: any = process.env.PORT || 3000

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://kraftwerk.vercel.app'
    : ['https://kraftwerk.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.set('view engine', 'ejs');
app.set('views', './src/routes/template/views'); 
app.use('/static', express.static(path.join(__dirname, 'public'))) 


app.use(express.json())
app.use(session({
    secret: 'iamyeabsira',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000*60, sameSite: 'none', secure: true}
  }));

app.use(passport.initialize())
app.use(passport.session())
app.use(userRoute)
app.use(forgotPassword)
app.use(personalInfoRoute)
app.use(educationRoute)
app.use(workExperienceRoute)
app.use(technicalSkillRoute)
app.use(softSkillRoute)
app.use(certificationRoute)
app.use(languageRoute)
app.use(projectRoute)
app.use(testResultRoute)
app.use(volunteerRoute)
app.use(cvRoutes)
app.use(templateRoute)

app.listen(PORT, ()=>{
    console.log('Server running on port', PORT)
})
