const express = require("express");
const router = express.Router();
const postFunctions = require("../data/posts");
const dashboardData = require("../data/dashboard");
const path = require("path");
const xss = require("xss");
const data = require("../data");
const userData = data.users;

//1. Get all posts routes --done
router.get("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(500).json({ 
        title: "error",
        error: "No request body provided!" });
    }
    const posts = await postFunctions.getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ 
      title: "error",
      error: error.message });
  }
});

// 2. Get posts by id --done
router.get("/:id", async (req, res) => {
  const id = xss(req.params.id);
  try {
    if (!id) {
      throw "Post ID not provided for edit!";
    }
    const post = await postFunctions.getPost(id);
    return res.status(200).json(post);
  } catch (error) {
    if (error.message) {
      return res.status(404).json({ 
        title: "error",
        error: error.message });
    }
    return res.status(500).json({ 
      title: "error",
      error: error.message });
  }
});

// http://localhost:3000/posts/userPosts/:username
// 3. Get posts by username --done
router.get("/userPosts/:username", async (req, res) => {
  const username = xss(req.params.username);

  if (!username) {
    return res.status(500).json({ 
      title: "error",
      error: "No username parameter!" });
  }
  try {
    const posts = await postFunctions.getUserPosts(username);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ 
      title: "error",
      error: error.message });
  }
});

// 4. find post by search term --pending
router.post("/search/:searchterm", async (req, res) => {
  const searchTerm = xss(req.body.searchterm);
  if (!req.body.searchterm) {
    return res.status(500).json({ 
      title: "error",
      error: "No search term provided" });
  }
  try {
    const posts = await postFunctions.findPostsbySearchterm(searchTerm);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ 
      title: "error",
      error: error.message });
  }
});

// 5. add post --done
router.post("/", async (req, res) => {
  const username = xss(req.session.user);
  let file = req.file;
  let imagePath;
  try {
    if (file) {
      if (checkFileType(file)) {
        imagePath = file.path.replace(/\\/g, "/");
      } else {
        res.status(400).json({ 
          title: "error",
          error: "Please attach only images!" });
        return;
      }
    }

    if (!req.body) {
      return res.status(500).json({ 
        title: "error",
        error: "No request body provided!" });
    }
    const newPost = req.body;
    if (
      !newPost.title ||
      typeof newPost.title != "string" ||
      newPost.title.trim("").length == 0
    ) {
      return res.status(400).json({
        title: "error",
        error: "Invalid post title, cannot be empty, type should be string.",
      });
    }
    if (
      !newPost.body ||
      typeof newPost.body != "string" ||
      newPost.body.trim("").length == 0
    ) {
      return res.status(400).json({
        title: "error",
        error: "Invalid post body, cannot be empty, type should be string.",
      });
    }
    if (
      !username ||
      typeof username != "string" ||
      username.trim("").length == 0
    ) {
      return res.status(400).json({
        title: "error",
        error: "Invalid username, cannot be empty, type should be string.",
      });
    }

    let tags = newPost.tags.replace(/\s/g, "").split(",");

    // call the addPost functions from the data
    const addPost = await postFunctions.addPost(
      req.session.userid,
      username,
      newPost.title,
      newPost.body,
      newPost.priority,
      tags,
      imagePath
    );

    if (addPost != null) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(400).render("dashBoard", {
      title: "error",
      error: error.message,
    });
  }
});

// 6. editing a post --done
router.patch("/edit/:id", async (req, res) => {
  let mt = [];

  let file = req.file;
  let imagePath;
  try {
    if (file) {
      if (checkFileType(file)) {
        imagePath = file.path.replace(/\\/g, "/");
      } else {
        res.redirect("/");
        return;
      }
    }
    if (!req.params || !req.params.id) {
      throw "Post ID not provided for edit!";
    }
    if (!req.body) {
      throw "No request body provided!";
    }
    if (req.body.postTitle && typeof req.body.postTitle != "string") {
      return res.status(400).json({
        title: "error",
        error: "Invalid post title, cannot be empty, type should be string.",
      });
    }
    if (req.body.postBody && typeof req.body.postBody != "string") {
      return res.status(400).json({
        title: "error",
        error: "Invalid post body, cannot be empty, type should be string.",
      });
    }
    mt.push(req.body.tags);
    let postFound = await postFunctions.getPost(req.params.id);

    const editedPost = await postFunctions.editPost(
      req.params.id,
      req.body.title,
      req.body.body,
      mt,
      req.body.editPost_priority,
      imagePath
    );

    return res.status(200).json(editedPost);
  } catch (error) {
    return res.status(500).json({ 
      title: "error",
      error: error.message });
  }
});

// 8. resolving a post
router.patch("/resolve/:id/:cid", async (req, res) => {
  try {
    if (!req.params || !req.params.id || !req.params.cid) {
      throw "Post ID not provided for resolve!";
    }
    await postFunctions.getPost(req.params.id);
    const resolvePost = await postFunctions.resolvePost(
      req.params.id,
      req.params.cid
    );
    return res.status(200).json(resolvePost);
  } catch (error) {
    if (error.message.includes("Post having ID")) {
      return res.status(404).json({ 
        title: "error",
        error: error.message });
    }
    return res.status(500).json({ 
      title: "error",
      error: error.message });
  }
});

// 9. deleting a post --done
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let postFound = await postFunctions.getPost(id);
  } catch (e) {
    res.status(404).json({ error: "Post not found." });
    return;
  }

  try {
    const deletePost = await postFunctions.deletePost(id);
    if (deletePost != null) {
      res.redirect("/myprofile");
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

//checking the filetypes
function checkFileType(file) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
