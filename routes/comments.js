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
      res.status(404).json("Post does not exist.");
      return;
    }

    const comments = commentsData.getAllPostComments(id);

    res.status(200).json(comments);
  } catch (e) {
    res.status(404).json({ error: "No comments found" });
  }
});

// 2. POST /comments/{postId}
router.post("/", async (req, res) => {
  let commentData = req.body;
  try {
    if (
      !commentData ||
      !commentData.userID ||
      !commentData.postID ||
      !commentData.username ||
      !commentData.body
    ) {
      res.status(400).json({ error: "improper data in body" });
      return;
    }

    let comment = commentsData.createComment(
      commentData.userID,
      commentData.postID,
      commentData.username,
      commentData.body,
      commentData.date
    );

    res.json(comment);
  } catch (e) {
    res.status(500).json({ error: "comments not found" });
    return;
  }
});

// 3. Delete comment    /comments/{commentId)

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

// 4. mark comment as resolved
router.patch("/resolve/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    let status = commentsData.markAsAnswer(id);

    res.status(200).json(status);
  } catch (e) {
    res.status(404).json({ error: "comment not found" });
  }
});

module.exports = router;
