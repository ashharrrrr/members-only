import passport from "passport";
import LocalStrategy from "passport-local";
import { findUserDB } from "../db/queries.js";
import bcryptjs from "bcryptjs";
import { pool } from "../db/pool.js";

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserDB(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcryptjs.compare(password, user.password_hash);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
            console.log(user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  return done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    const user = rows[0];
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
