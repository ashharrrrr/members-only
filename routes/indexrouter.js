import { Router } from "express";
import { getLoginForm, getRegisterForm, registerUser } from "../controllers/homeController.js";
import passport from "passport";
import "../strategies/passportlocal.config.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.render("index", { user: req.user }));

indexRouter.get("/login", getLoginForm);
indexRouter.post("/login", passport.authenticate("local", {successRedirect: "/", failureRedirect: "/login"}));

indexRouter.get("/register", getRegisterForm);
indexRouter.post("/register", registerUser);

export default indexRouter;
