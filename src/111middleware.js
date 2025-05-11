import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import UserModel from "./Note.js";
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
