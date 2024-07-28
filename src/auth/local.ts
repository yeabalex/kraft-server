import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { login, findById } from "../postgres/account/user";

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findById(id);
        if (!user) {
            return done(new Error('User not found'), null);
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const loggedUser = await login(email, password);
        if (!loggedUser) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        done(null, loggedUser);
    } catch (err) {
        done(err);
    }
}));

export default passport;
