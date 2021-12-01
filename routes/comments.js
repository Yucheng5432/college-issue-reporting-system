const express = require("express");
const router = express.Router();
const data = require("../data");
const commentsData = data.comments;
const postsData = data.posts;
let { ObjectId } = require("mongodb");

// 1.GET comments/{postId}   get all posts comments by given postID -- done
// http://localhost:3000/comments/postid
router.get("/:id", async (req, res) => {
  const id = ObjectId(req.params.id);
  try {
    const post = await postsData.getPost(id);
    if (!post) {
      res.status(404).json("Post does not exist.");
      return;
    }

    let comments = post.comments;
    // console.log(id);
    // console.log(post);

    // const comments = await commentsData.getAllPostComments(id);
    // console.log(comments);
    // console.log(comments);

    res.status(200).json(comments);
  } catch (e) {
    res.status(404).json({ error: "No comments found" });
    return;
  }
});

// 2. POST /comments/{postId} --done
router.post("/:id", async (req, res) => {
  let commentData = req.body;
  const postId = ObjectId(req.params.id);

  // console.log(commentData);
  // console.log(postId);
  try {
    if (!commentData || !postId || !commentData.username || !commentData.body) {
      res.status(400).json({ error: "improper data in body" });
      return;
    }

    // console.log("Entering the createcomment");

    let comment = await commentsData.createComment(
      postId,
      commentData.username,
      commentData.body
    );

    // console.log("Exiting the create");
    // console.log(comment);

    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({ error: "comments not found" });
    return;
  }
});

// 3. Delete comment    /comments/{commentId) --done

router.delete("/:id", async (req, res) => {
  const id = ObjectId(req.params.id);
  console.log(id);
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

// 4. mark comment as resolved use commentId--done
router.patch("/resolve/:id", async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    let status = await commentsData.markAsAnswer(id);
    // console.log(status);

    return res.status(200).json(status);
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

module.exports = router;
