import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { login } from "../postgres/user";
import { findById } from "../postgres/user";


passport.serializeUser((user:any,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id, done)=>{
    const user = findById(id)
    done(null, user)
})

export default passport.use(new LocalStrategy({usernameField:'email'}, async(email, password, done)=>{
    try{
    const loggedUser = await login(email, password)
    
    if(!loggedUser) throw new Error('Invalid Credientials')

    done(null, loggedUser)
}catch(err){
    done(err, false)
}

}))