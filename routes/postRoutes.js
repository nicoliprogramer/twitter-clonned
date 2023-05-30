import express from "express";
import bodyParser from "body-parser";
import User from "../schemas/userModel.js";
import bcrypt from "bcrypt";
const app = express();
const router = express.Router();

router.get("/:id", (req, res, next) => {
  let payload = {
    pageTitle: "View post",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    postId: req.params.id,
  };

  res.status(200).render("postPage", payload);
});

export default router;
