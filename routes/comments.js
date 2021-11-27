const express = require("express");
const router = express.Router();
const commentFunctions = require("../data/comments");
const ObjectId = require("mongodb");
const { type } = require("os");

// 1. get all comments
router.get("/", async (req, res) => {
  try {
    const commData = await commentFunctions();
    let allComms = await commData.getAllComments();
    res.json(allComms);
  } catch (e) {
    res.status(404).json({ error: "comments not found" });
  }
});

// 2. get all posts comments by id
router.get("/:pid", async (req, res) => {
  if (!req.params.pid) {
    throw "No id provided.";
  }
  try {
    let id = ObjectId(req.params.pid);

    let comments = commData.getAllPostComments(id);
    res.json(comments);
  } catch (e) {
    res.status(404).json({ error: "comments not found" });
  }
});

// 3. post comments
router.post("/", async (req, res) => {
  const commentData = req.body;

  try {
    if (
      !commentData ||
      !commentData.userID ||
      !commentData.postID ||
      !commentData.username ||
      !commentData.body
    ) {
      res.status(400).json({ error: "improper data in body" });
    }

    if (typeof username != "string") {
      res.status(400).json({ error: "username is not string." });
    }
    if (typeof body != "string") {
      res.status(400).json({ error: "body is not string" });
    }

    const commData = await commentFunctions();
    let comment = await commData.createComment(
      commentData.userID,
      commentData.postID,
      commentData.username,
      commentData.body
    );

    res.json(comment);
  } catch (e) {
    res.status(500).json({ error: "comments not found" });
  }
});
