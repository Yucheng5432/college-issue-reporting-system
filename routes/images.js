const express = require("express");
const router = express.Router();
const data = require("../data");
const imagesFunctions = data.images;
const path = require("path");

// 1.POST for upload
router.post("/upload", async (req, res) => {
  const username = req.session.user;
  let file = req.file;
  if (!file) {
    res.redirect("/myprofile");
    return;
  }
  imagePath = file.path.replace(/\\/g, "/");

  try {
    const addProfilePhoto = await imagesFunctions.uploadProfilePhoto(
      username,
      imagePath
    );
    if (addProfilePhoto != null) {
      res.redirect("/myprofile");
      return;
    }
  } catch (e) {
    res.status(400).json({
      title: "error",
      error: e.message,
    });
    return;
  }
});

// 2.GET profilephoto

router.get("/upload/:username", async (req, res) => {
  const username = req.params.username;

  if (!username) {
    res.status(400).json({
      title: "error",
      error: "Not valid user",
    });
    return;
  }

  try {
    const image = await imagesFunctions.getProfilePhoto(username);
    return res.status(200).json(image);
  } catch (e) {
    res.status(404).json({
      title: "error",
      error: e,
    });
    return;
  }
});

module.exports = router;
