import bcryptjs from "bcryptjs";
import { addUserDB, getAllMessagesDB, postMessageDB, makeMemberDB, makeAdminDB, deleteMessageDB} from "../db/queries.js";

export async function getLoginForm(req, res) {
  return res.render("login");
}

export async function getRegisterForm(req, res) {
  return res.render("register");
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

export async function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

export async function getAllMessages(req, res, next) {
  try {
    const messages = await getAllMessagesDB();
    res.render("index", { messages: messages, user: req.user })
  } catch (err) {
        return next(err);
    }
}

export async function postMessage(req, res, next) {
    try{
        console.log("hell", req.body);
        const { title, body } = req.body;
        const userId = req.user.user_id
        await postMessageDB(userId, title, body);
        res.redirect("/");
    } catch(err){
        return next(err);
    }
}

export async function makeMember(req, res, next){
  try{
    if (req.body.secretpassword == process.env.MEMBERSHIP_PASSWORD){
      const userID = req.user.user_id
      await makeMemberDB(userID)
      res.redirect("/")
    }
  } catch (err) {
    return next(err)
  }
}

export async function adminlogin(req, res, next){
  try{
    if (req.body.secretpassword == process.env.ADMIN_PASSWORD){
      const userID = req.user.user_id
      console.log("About to call makeAdminDB");
      await makeAdminDB(userID);
      console.log("makeAdminDB completed, about to call makeMemberDB");
      await makeMemberDB(userID)
      console.log("memberd");
      res.redirect("/")
    }
  } catch (err) {
    return next(err)
  }
}

export async function deleteMessage(req, res, next){
  try{
    const messageId = req.params.id;
    await deleteMessageDB(messageId);
    res.redirect(req.get("Referer"));
  } catch (err) {
    return next(err) 
  }
}
