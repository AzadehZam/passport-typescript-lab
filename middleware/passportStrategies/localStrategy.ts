import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
     const data = getUserByEmailIdAndPassword(email, password);
    
    return data.user 
       ? done(null, data.user)
      : done(null, false, {
          message: data.err,
        }); 
  }
);

declare global {
    namespace Express {
      interface User {
        id: number;
      }
    }
}
/*
FIX ME (types) - done 
*/
passport.serializeUser(function (user: Express.User, done: (err:any , id?: number | undefined) => void) {
  done(null, user.id);
});

/*
FIX ME (types) - done 
*/
passport.deserializeUser(function (id: number, done: (err: any , user?: false | Express.User | null | undefined ) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
