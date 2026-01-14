import bcryptjs from "bcryptjs";
import { addUserDB } from "../db/queries.js";

export async function getLoginForm(req, res) {
    res.render("login")
}

export async function getRegisterForm(req, res) {
    res.render("register")
}

export async function registerUser(req, res, next) {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const fullname = req.body.name;
        const username = req.body.username;
        await addUserDB(fullname, username, hashedPassword);
        res.redirect("/login");

    } catch (err) {
        return next(err);
    }
}

