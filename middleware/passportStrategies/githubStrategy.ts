import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { database, userModel } from "../../models/userModel";
import { getUserById } from "../../controllers/userController";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: "04e7f920c77d075f6f5f",
    clientSecret: "aa741de8e5ed56e1c65ce588a86c6b07d444cb28",
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
  },
  async function (
    req: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    process.nextTick(function () {
      const user: {
        id: number;
        name: string;
        email: string;
        password: string;
      } = {
        id: parseInt(profile.id),
        name: profile._json.name,
        email: "",
        password: "",
      };
      try {
        let registeredUser = getUserById(user.id);
        return done(null, registeredUser);
      } catch (error) {
        database.push(user);
        return done(null, user);
      }
    });
  }
);

/* FIX ME - done */
const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
