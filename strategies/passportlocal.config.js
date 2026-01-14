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
      const match = await bcryptjs.compare(password, user.password);
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
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
        console.log("hello")
    const { rows } = await pool.query("SELECT * FROM users WHERE id =$1", [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
