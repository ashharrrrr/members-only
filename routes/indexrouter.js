import { Router } from "express";
import { getLoginForm, getRegisterForm, registerUser, logout, getAllMessages, makeMember, adminlogin } from "../controllers/homeController.js";
import passport from "passport";
import "../strategies/passportlocal.config.js";
import messageRouter from "./messageRouter.js";

const indexRouter = Router();

indexRouter.get("/", getAllMessages);

indexRouter.use("/message", messageRouter)

indexRouter.get("/login", getLoginForm);
indexRouter.post("/login", passport.authenticate("local", {successRedirect: "/", failureRedirect: "/login"}));

indexRouter.get("/register", getRegisterForm);
indexRouter.post("/register", registerUser);

indexRouter.get("/member", (req, res) => res.render("memberform"));
indexRouter.post("/member", makeMember);

indexRouter.get("/admin", (req, res) => res.render("adminform"));
indexRouter.post("/admin", adminlogin);

indexRouter.get("/logout", logout)

export default indexRouter;
