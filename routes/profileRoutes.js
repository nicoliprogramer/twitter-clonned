import express from "express";
import bodyParser from "body-parser";
import User from "../schemas/userModel.js";
import bcrypt from "bcrypt";
const app = express();
const router = express.Router();

router.get("/:username", async (req, res, next) => {
  let payload = await getPayload(req.params.username, req.session.user);

  res.status(200).render("profilePag", payload);
});

async function getPayload(username, userLoggedIn) {
  let user = await User.findOne({ username: username });

  if (user == null) {
    user = await User.findById(username);

    if (user == null) {
      return {
        pageTitle: "User not found",
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
      };
    }
  }
  return {
    pageTitle: user.username,
    userLoggedIn: userLoggedIn,
    userLoggedInJs: JSON.stringify(userLoggedIn),
    profileUser: user,
  };
}

export default router;
