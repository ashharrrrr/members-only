import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import indexRouter from "./routes/indexrouter.js";
import session from "express-session";
import { pool } from "./db/pool.js";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import "dotenv/config";
import "./strategies/passportlocal.config.js";

// some plumbing to make view engine work in type: module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// setting up the session
const pgSession = connectPgSimple(session);
const store = new pgSession({ pool: pool, tableName: "session" });

const app = express();

// view engine ejs config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    store: store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// to extract data from the incoming req url
app.use(express.urlencoded({ extended: false }));
// router config
app.use("/", indexRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on 3000!");
});
