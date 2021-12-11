const express = require("express");
const router = express.Router();
const data = require("../data");
const commentsData = data.comments;
const postsData = data.posts;
let { ObjectId } = require("mongodb");

// 1.GET comments/{postId}   get all posts comments by given postID 
// http://localhost:3000/comments/postid
router.get("/:id", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }
  const id = ObjectId(req.params.id);
  try {
    const post = await postsData.getPost(id);
    if (!post) {
      res.status(404).json("Post does not exist.");
      return;
    }

    let comments = post.comments;

    res.status(200).json(comments);
  } catch (e) {
    res.status(404).json({ 
      title: "error",
      error: "No comments found" });
    return;
  }
});

// 2. POST /comments/{postId} 
router.post("/:id", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }
  let commentData = req.body.comment;
  const postId = ObjectId(req.params.id);
  const username = req.session.user;

  try {
    if (!commentData) {
      res.redirect("/");
      return;
    }

    if (!postId || !username) {
      res.status(400).json({ 
        title: "error",
        error: "improper data in body" });
      return;
    }

    if (!ObjectId.isValid(postId)) {
      res.status(400).json({ 
        title: "error",
        error: "Post Id is not valid" });
      return;
    }

    if (commentData.trim("").length == 0) {
      res.redirect("/");
      return;
    }

    let comment = await commentsData.createComment(
      postId,
      username,
      commentData
    );

    if (comment != null) {
      res.redirect("/");
    } else {
      res.status(400).json({ 
        title: "error",
        error: "Comment not created" });
      return;
    }
  } catch (e) {
    res.status(500).json({ 
      title: "error",
      error: "comments not found" });
    return;
  }
});

// 3. Delete comment    /comments/{commentId) 

router.delete("/:id", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  const id = ObjectId(req.params.id);
  if (!id) {
    res.status(400).json({ 
      title: "error",
      error: "comment id is undefined" });
    return;
  }

  try {
    await commentsData.getComment(id);
  } catch (e) {
    res.status(404).json({ 
      title: "error",
      error: "No comment found with this comment id." });
    return;
  }

  try {
    const deleteComment = await commentsData.deleteComment(id);
    if (!deleteComment) {
      res.status(404).json({ 
        title: "error",
        error: "Comment cannot be deleted." });
      return;
    } else {
      res.redirect("/");
    }
    
  } catch (e) {
    res.status(500).json({ 
      title: "error",
      error: e.message });
    return;
  }
});

// 4. mark comment as resolved use commentId
router.patch("/resolve/:id", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }
  try {
    const id = ObjectId(req.params.id);
    let status = await commentsData.markAsAnswer(id);

    if (status != null) {
      res.redirect("/myprofile");
    }
  } catch (e) {
    res.status(404).json({ 
      title: "error",
      error: e.message });
    return;
  }
});

module.exports = router;
