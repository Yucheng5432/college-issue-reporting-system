const express = require("express");
const router = express.Router();
const postFunctions = require("../data/posts");

//1. Get all posts routes
router.get("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(500).json({ error: "No request body provided!" });
    }
    const posts = await postFunctions.getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Get posts by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw "Post ID not provided for edit!";
    }
    const post = await postFunctions.getPost(id);
    return res.status(200).json(post);
  } catch (error) {
    if (error.message.includes("Post having ID")) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
