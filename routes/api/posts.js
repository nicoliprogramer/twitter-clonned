import express from "express";
import bodyParser from "body-parser";
import User from "../../schemas/userModel.js";
import Post from "../../schemas/postModel.js";
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  Post.find()
    .populate("postedBy")
    .sort({ createdAt: -1 })
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

router.post("/", async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  let postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postedBy" });
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

router.put("/:id/like", async (req, res, next) => {
  let postId = req.params.id;
  let userId = req.session.user._id;

  let isLiked =
    req.session.user.likes && req.session.user.likes.includes(postId);

  let option = isLiked ? "$pull" : "$addToSet";

  // insert user like

  req.session.user = await User.findByIdAndUpdate(
    userId,
    {
      [option]: { likes: postId },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  // insert post like

  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { likes: userId },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.status(200).send(post);
});

router.post("/:id/retweet", async (req, res, next) => {
  let postId = req.params.id;
  let userId = req.session.user._id;

  // try and delete retweet
  let deletedPost = await Post.findOneAndDelete({
    postedBy: userId,
    retweetData: postId,
  }).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  let option = deletedPost != null ? "$pull" : "$addToSet";

  let repost = deletedPost;

  if (repost == null) {
    repost = await Post.create({ postedBy: userId, retweetData: postId }).catch(
      (error) => {
        console.log(error);
        res.sendStatus(400);
      }
    );
  }

  // insert user retweet

  req.session.user = await User.findByIdAndUpdate(
    userId,
    {
      [option]: { retweets: repost._id },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  // insert post retweet

  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { retweetUsers: userId },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.status(200).send(post);
});

export default router;
