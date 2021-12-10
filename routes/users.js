const express = require("express");
const router = express.Router();
const data = require("../data");
const userFunctions = data.users;
const dashboardData = data.dashboard;
const postFunctions = require("../data/posts");
const path = require("path");
const xss = require("xss");

let myid = "";
let url = "";
let { ObjectId } = require("mongodb");
const { title } = require("process");

router.get("/", async (req, res) => {
  if (xss(req.session.user)) {
    res.redirect("/dashboard");
  } else {
    res.render("login", { title: "Login Page" });
  }
  /*if (!req.session.user) {
    res.render("login", { title: "Login Page" });
  } else {
    res.redirect("/dashboard");
  }
  */
});

router.get("/login", async (req, res) => {
  if (xss(req.session.user)) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/");
  }
  /*if (!req.session.user) {
    res.redirect("/");
  } else {
    res.redirect("/dashboard");
  }*/
});

// GET SignUP
router.get("/signup", async (req, res) => {
  if (xss(req.session.user)) {
    res.redirect("/dashboard");
  } else {
    res.render("signup", { title: "Signup Page" });
  }
  /*
  if (!req.session.user) {
    res.render("signup", { title: "Signup Page" });
  } else {
    res.redirect("/dashboard");
  }*/
});

// 4. POST for SignUp
router.post("/signup", async (req, res) => {
  try {
    let reqBody = req.body;
    let username = xss(reqBody.username.trim().toLowerCase());
    let password = xss(reqBody.password.trim());
    let firstName = xss(reqBody.firstname.trim());
    let lastName = xss(reqBody.lastname.trim());
    let email = xss(reqBody.email.trim());
    let major = xss(reqBody.major.trim());
    let year = xss(reqBody.year.trim());
    year = parseInt(year);
    if (!username) {
      res
        .status(404)
        .render("signup", { hasErrors: true, error: "Must supply username!." });
      return;
    }
    if (/\s/.test(username)) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      res.status(400).render("signup", {
        hasErrors: true,
        error: `Only alphanumeric characters allowed!`,
      });
      return;
    }
    if (username.length < 4) {
      res.status(400).render("signup", {
        hasErrors: true,
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    if (!password) {
      res
        .status(404)
        .render("signup", { hasErrors: true, error: "Must supply password!" });
      return;
    }
    if (/\s/.test(password)) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (password.length < 6) {
      res.status(400).render("signup", {
        hasErrors: true,
        error: `Password must be atleast 6 characters long!`,
      });
      return;
    }
    if (!firstName) {
      res.status(404).render("signup", {
        hasErrors: true,
        error: "Must supply firstname!.",
      });
      return;
    }
    if (/\s/.test(firstName)) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!lastName) {
      res
        .status(404)
        .render("signup", { hasErrors: true, error: "Must supply lastname!" });
      return;
    }
    if (/\s/.test(lastName)) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!email) {
      res
        .status(404)
        .render("signup", { hasErrors: true, error: "Must supply email!" });
      return;
    }
    if (/\s/.test(email)) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Email has spaces` });
      return;
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Enter valid email-id` });
      return;
    }
    if (!major) {
      res
        .status(404)
        .render("signup", { hasErrors: true, error: "Must supply major!" });
      return;
    }
    if (/\s/.test(major)) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Major has spaces` });
      return;
    }
    if (!year) {
      res
        .status(404)
        .render("signup", { hasErrors: true, error: "Must supply year!" });
      return;
    }
    if (/\s/.test(year)) {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: `Year has spaces` });
      return;
    }
    if (typeof year != "number") {
      res.status(400).render("signup", {
        hasErrors: true,
        error: "Year must be of type number",
      });
      return;
    }

    const isCredentialsValid = await userFunctions.createUser(
      username,
      firstName,
      lastName,
      email,
      password,
      major,
      year,
      
    );

    if (isCredentialsValid != null) {
      res.redirect("/");
    } else {
      res.status(400).render("signup", {
        hasErrors: true,
        error: "Username or password is invalid",
      });
      return;
    }
  } catch (e) {
    res.render("signup", { hasErrors: true, error: e });
  }
});

// 5. POST for Login
router.post("/login", async (req, res) => {
  try {
    let reqBody = req.body;
    let username = xss(reqBody.username.trim().toLowerCase());
    let password = xss(reqBody.password.trim());

    /*
    let username = req.body["username"];
    let password = req.body["password"];
    username = username.trim();
    username = username.toLowerCase();
    password = password.trim();*/

    if (!username) {
      res.status(400).render("login", {
        hasErrors: true,
        error: "You must enter a username!",
      });
      return;
    }
    if (/\s/.test(username)) {
      res
        .status(400)
        .render("login", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      res.status(400).render("login", {
        hasErrors: true,
        error: `Only alphanumeric characters allowed!`,
      });
      return;
    }
    if (username.length < 4) {
      res.status(400).render("login", {
        hasErrors: true,
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    if (!password) {
      res.status(400).render("login", {
        hasErrors: true,
        error: `You must enter a password!`,
      });
      return;
    }
    if (/\s/.test(password)) {
      res
        .status(400)
        .render("login", { hasErrors: true, error: `Password has spaces` });
      return;
    }
    if (password.length < 6) {
      res.status(400).render("login", {
        hasErrors: true,
        error: `Password must be atleast 6 characters long!`,
      });
      return;
    }
    const isCredentialsValid = await userFunctions.checkUser(
      username,
      password
    );

    if (isCredentialsValid != null) {
      // console.log(isCredentialsValid);
      req.session.user = username;
      req.session.id = isCredentialsValid._id;
      let a = isCredentialsValid._id;
      req.session.userid = a;
      // console.log(req.session.user)
      // console.log(req.session.id)
      myid = isCredentialsValid._id.toString();
      res.redirect("/dashboard");
    } else {
      res.render("login", {
        hasErrors: true,
        error: "Either username or password is incorrect",
        username: username,
        password: password,
      });
    }
  } catch (e) {
    let hasErrors = true;
    res.status(400).render("login", {
      hasErrors: hasErrors,
      error: e,
    });
    return;
  }
});

// GET Login
router.get("/dashboard", async (req, res) => {
  const userName = xss(req.session.user); //this username the one who is logged in.
  // console.log(req.session.user);
  try {
    const allPostDashboard = await dashboardData.getAllPosts();
    res.render("dashBoard", {
      title: userName.toLowerCase(),
      username: userName.toLowerCase(),
      posts: allPostDashboard,
    });
  } catch (e) {
    let error = true;
    res.status(400).render("dashboard", {
      title: userName.toLowerCase(),
      username: userName.toLowerCase(),
      posts: allPostDashboard,
      error: error,
    });
    return;
  }
});

// get all posts by username
router.get("/myprofile", async (req, res) => {
  const userName = xss(req.session.user);

  // console.log("Inside profilePage", userName);
  try {
    if (userName != null) {
      const myPosts = await dashboardData.getAllPostsByUserName(userName);
      const user = await userFunctions.getUserbyUsername(userName);
      const photo = await dashboardData.getProfilePhotoByUserName(userName);
      res.status(200).render("myprofile", {
        title: userName.toLowerCase(),
        username: userName.toLowerCase(),
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        major: user.major,
        year: user.year,
        photo: photo,
        myPosts: myPosts,
      });
    }
  } catch (e) {
    res.status(400).json({ error: "Users Post not able to display." });
    return;
  }
});

router.post("/myprofile", async (req, res) => {
  res.redirect("/editProfile");
});

router.get("/logout", async (req, res) => {
  if (xss(req.session.user)) {
    req.session.destroy();
    res.render("logout", { title: "Logged out" });
  } else {
    // console.log("logout");
    res.redirect("/");
  }
});

router.get("/editProfile", async (req, res) => {
  let username = xss(req.session.user);
  if (xss(req.session.user)) {
    res.status(200).render("editProfile", {
      title: "editProfile",
      username: username,
    });
  } else {
    res.render("login", { title: "Login Page" });
  }
  /*if (!req.session.user) {
    res.render("login", { title: "Login Page" });
  } else {
    res.status(200).render("editProfile", { username: username });
  }*/
});

router.post("/editProfile", async (req, res) => {
  try {
    let reqBody = req.body;
    // let username = req.body["username"].trim().toLowerCase();
    let username = xss(req.session.user);
    let password = xss(reqBody.password.trim());
    //let password = req.body["password"].trim();
    let firstName = xss(reqBody.firstname.trim());
    //let firstName = req.body["firstname"].trim();
    let lastName = xss(reqBody.lastname.trim());
    //let lastName = req.body["lastname"].trim();
    let email = xss(reqBody.email.trim());
    // let email = req.body["email"].trim();
    let major = xss(reqBody.major.trim())
    let year = xss(reqBody.year.trim());
    //let year = req.body["year"].trim();
  
    // year = parseInt(year);
    // if (!username) {
    //   res.status(404).render("editProfile", {
    //     hasErrors: true,
    //     error: "Must supply username!.",
    //   });
    //   return;
    // }
    if (/\s/.test(username)) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Username has spaces`,
      });
      return;
    }
    if (username && !username.match(/^[a-z0-9]+$/i)) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Only alphanumeric characters allowed!`,
      });
      return;
    }
    if (username && username.length < 4) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    // if (!password) {
    //   res.status(404).render("editProfile", {
    //     hasErrors: true,
    //     error: "Must supply password!",
    //   });
    //   return;
    // }
    if (/\s/.test(password)) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Username has spaces`,
      });
      return;
    }
    if (password && password.length < 6) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Password must be atleast 6 characters long!`,
      });
      return;
    }
    // if (!firstName) {
    //   res.status(404).render("editProfile", {
    //     hasErrors: true,
    //     error: "Must supply firstname!.",
    //   });
    //   return;
    // }
    if (/\s/.test(firstName)) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Username has spaces`,
      });
      return;
    }
    // if (!lastName) {
    //   res.status(404).render("editProfile", {
    //     hasErrors: true,
    //     error: "Must supply lastname!",
    //   });
    //   return;
    // }
    if (/\s/.test(lastName)) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Username has spaces`,
      });
      return;
    }
    // if (!email) {
    //   res.status(404).render("editProfile", {
    //     hasErrors: true,
    //     error: "Must supply email!",
    //   });
    //   return;
    // }
    if (/\s/.test(email)) {
      res
        .status(400)
        .render("editProfile", { hasErrors: true, error: `Email has spaces` });
      return;
    }
    if (
      email &&
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: `Enter valid email-id`,
      });
      return;
    }

    if(major && !major.match("Computer Science") && !major.match("Business") && !major.match("Engineering") && !major.match("System-and-Analytics") && !major.match("Mechanical Engineering")
  && !major.match("Chemical Engineering") && !major.match("Material Science")){
    res.status(400).render("editProfile", {
      hasErrors: true,
      error: `Major must be from the following fields only
      Computer Science, Business, Engineering, System-and-Analytics,
      Mechanical Engineering, Chemical Engineering, Material Science`,
    });
    return;
  }
    // if (!major) {
    //   res.status(404).render("editProfile", {  hasErrors: true,error: "Must supply major!" });
    //   return;
    // }
    // if (/\s/.test(major)) {
    //   res.status(400).render("editProfile", { hasErrors: true, error: `Major has spaces` });
    //   return;
    // }
    // if (!year) {
    //   res
    //     .status(404)
    //     .render("editProfile", { hasErrors: true, error: "Must supply year!" });
    //   return;
    // }
    if (/\s/.test(year)) {
      res
        .status(400)
        .render("editProfile", { hasErrors: true, error: `Year has spaces` });
      return;
    }
    // if (year && typeof year != "number") {
    //   res.status(400).render("editProfile", {
    //     hasErrors: true,
    //     error: "Year must be of type number",
    //   });
    //   return;
    // }

    if (year && !year.match("^[0-9]+$")) {
      res.status(400).render("editProfile", {
        hasErrors: true,
        error: "Year must be of type number",
      });
      return;
    }

    year = year.toString();
    const isCredentialsValid = await userFunctions.updateUser(
      myid,
      username,
      firstName,
      lastName,
      email,
      major,
      password,
      year,
    );

    if (isCredentialsValid != null) {
      req.session.user = username;
      res.redirect("/myprofile");
    } else {
      res
        .status(400)
        .render("editProfile", { hasErrors: true, error: "error" });
      return;
    }
  } catch (e) {
    res.render("editProfile", { hasErrors: true, error: e });
  }
});

router.get("/editPost", async (req, res) => {
  let userName = xss(req.session.user);
  const user = await userFunctions.getUserbyUsername(userName);
  const myPosts = await dashboardData.getAllPostsByUserName(userName);
  // let urL = document.getElementById('editPostbtn').value()
  let urL = req.originalUrl;
  console.log(urL);
  const slug = urL.substring(urL.indexOf("=") + 1); // 01-2020
  let newUrl = ObjectId(slug);
  console.log(typeof newUrl);

  // get everything after last dash
  // const slug = str.split('-').pop(); // 2020

  if (xss(req.session.user)) {
    res.render("editPost", {
      title: userName.toLowerCase(),
      username: userName.toLowerCase(),
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      major: user.major,
      year: user.year,
      myPosts: myPosts,
      newUrl: newUrl,
    });
  } else {
    res.status(200).render("login");
  }
});

router.patch("/editPost/:id", async (req, res) => {
  // let mt = [];
  // console.log(req.params.id);
  let file = req.file;
  let tags = req.body.tags;
  console.log(file);
  let imagePath;
  try {
    if (file) {
      if (checkFileType(file)) {
        imagePath = file.path.replace(/\\/g, "/");
        console.log(imagePath);
      } else {
        res.redirect("/editPost");
        return;
      }
    }
    // if (!req.params || !req.params.id) {
    //   throw "Post ID not provided for edit!";
    // }
    // if (!req.body) {
    //   throw "No request body provided!";
    // }
    // if (req.body.postTitle && typeof req.body.postTitle != "string") {
    //   return res.status(400).json({
    //     error: "Invalid post title, cannot be empty, type should be string.",
    //   });
    // }
    // if (req.body.postBody && typeof req.body.postBody != "string") {
    //   return res.status(400).json({
    //     error: "Invalid post body, cannot be empty, type should be string.",
    //   });
    // }
    let postFound = await postFunctions.getPost(req.params.id);
    // mt.push(xss(req.body.tags));
    console.log(tags.trim().length);
    if (tags != null || tags != undefined || tags.trim().length != 0) {
      tags = req.body.tags.replace(/\s/g, "").split(",");
    }

    // console.log(req.body.editPost_priority);
    // console.log(postFound);
    let post = await postFunctions.checkPostOwnership(
      req.session.userid,
      req.params.id
    );
    if (post === true) {
      const editedPost = await postFunctions.editPost(
        req.params.id,
        req.body.title,
        req.body.body,
        tags,
        req.body.editPost_priority,
        imagePath
      );
    } else {
      res.status(400).json("You cannot change/access other users data!!");
      return;
      // return
    }
    if (editedPost != null) {
      res.redirect("/myprofile");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
