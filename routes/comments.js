const express = require("express");
const router = express.Router();
const data = require("../data");
const commentsData = data.comments;
const postsData = data.posts;
let { ObjectId } = require("mongodb");

// 1.GET comments/{commentId}   get all posts comments by given postID
router.get("/:id", async (req, res) => {
  const { id } = ObjectId(req.params.id);
  try {
    const post = await postsData.getPost(id);
    if (!post) {
      throw "Post does not exist.";
    }

    const comments = commentsData.getAllPostComments(id);

    res.status(200).json(comments);
  } catch (e) {
    res.status(404).json({ error: "No comments found" });
  }
});

// 2. Delete comment    /comments/{commentId)

router.delete("/:id", async (req, res) => {
  const { id } = ObjectId(req.params.id);
  try {
    await commentsData.getComment(id);
  } catch (e) {
    res.status(404).json({ error: "No comment found with this comment id." });
    return;
  }

  try {
    const deleteComment = await commentsData.deleteComment(id);
    if (!deleteComment) {
      res.status(404).json({ error: "Comment cannot be deleted." });
      return;
    }
    res.status(200).json(deleteComment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
