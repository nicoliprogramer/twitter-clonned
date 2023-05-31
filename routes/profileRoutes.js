import express from "express";
import bodyParser from "body-parser";
import User from "../schemas/userModel.js";
import bcrypt from "bcrypt";
const app = express();
const router = express.Router();

router.get("/", (req, res, next) => {
  let payload = {
    pageTitle: req.session.user.username,
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    profileUser: req.session.user,
  };

  res.status(200).render("profilePag", payload);
});

export default router;
