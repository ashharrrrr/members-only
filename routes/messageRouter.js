import { Router } from "express";
import { postMessage, deleteMessage } from "../controllers/homeController.js";

const messageRouter = Router();

messageRouter.get("/", (req, res) => res.render("messageform"));
messageRouter.post("/", postMessage);

messageRouter.post("/delete/:id", deleteMessage)

export default messageRouter;
