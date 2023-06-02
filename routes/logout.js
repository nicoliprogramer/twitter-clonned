import express from "express";
import bodyParser from "body-parser";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
});

export default router;
