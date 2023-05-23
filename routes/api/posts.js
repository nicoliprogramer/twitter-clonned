import express from "express";
import bodyParser from "body-parser";
import User from "../../schemas/userModel.js";
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {});

router.post("/", async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  res.status(200).send("it worked");
});

export default router;
