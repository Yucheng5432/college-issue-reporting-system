const express = require("express");
const router = express.Router();
const data = require("../data");
const userFunctions = data.users;
const dashboardData = data.dashboard;

router.get("/", async (req, res) => {
  if (!req.session.user) {
    res.render("login", { title: "Login Page" });
  } else {
    res.redirect("/dashboard");
  }
});

router.get("/login", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    res.redirect("/dashboard");
  }
});

// GET SignUP
router.get("/signup", async (req, res) => {
  if (!req.session.user) {
    res.render("signup", { title: "Signup Page" });
  } else {
    res.redirect("/dashboard");
  }
});

// 4. POST for SignUp
router.post("/signup", async (req, res) => {
  try {
    let username = req.body["username"].trim().toLowerCase();
    let password = req.body["password"].trim();
    let firstName = req.body["firstname"].trim();
    let lastName = req.body["lastname"].trim();
    let email = req.body["email"].trim();
    let major = req.body["major"].trim();
    let year = req.body["year"].trim();
    let bio = req.body["bio"];
    year = parseInt(year);
    if (!username) {
      res.status(404).render("signup", { error: "Must supply username!." });
      return;
    }
    if (/\s/.test(username)) {
      res.status(400).render("signup", { error: `Username has spaces` });
      return;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      res.status(400).render("signup", {
        error: `Only alphanumeric characters allowed!`,
      });
      return;
    }
    if (username.length < 4) {
      res.status(400).render("signup", {
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    if (!password) {
      res.status(404).render("signup", { error: "Must supply password!" });
      return;
    }
    if (/\s/.test(password)) {
      res.status(400).render("signup", { error: `Username has spaces` });
      return;
    }
    if (password.length < 6) {
      res.status(400).render("signup", {
        error: `Password must be atleast 6 characters long!`,
      });
      return;
    }
    if (!firstName) {
      res.status(404).render("signup", { error: "Must supply firstname!." });
      return;
    }
    if (/\s/.test(firstName)) {
      res.status(400).render("signup", { error: `Username has spaces` });
      return;
    }
    if (!lastName) {
      res.status(404).render("signup", { error: "Must supply lastname!" });
      return;
    }
    if (/\s/.test(lastName)) {
      res.status(400).render("signup", { error: `Username has spaces` });
      return;
    }
    if (!email) {
      res.status(404).render("signup", { error: "Must supply email!" });
      return;
    }
    if (/\s/.test(email)) {
      res.status(400).render("signup", { error: `Username has spaces` });
      return;
    }
    if (!major) {
      res.status(404).render("signup", { error: "Must supply major!" });
      return;
    }
    if (/\s/.test(major)) {
      res.status(400).render("signup", { error: `Username has spaces` });
      return;
    }
    if (!year) {
      res.status(404).render("signup", { error: "Must supply year!" });
      return;
    }
    if (/\s/.test(year)) {
      res.status(400).render("signup", { error: `Username has spaces` });
      return;
    }
    if (typeof year != "number") {
      res
        .status(400)
        .render("signup", { error: "Year must be of type number" });
      return;
    }

    const isCredentialsValid = await userFunctions.createUser(
      username,
      firstName,
      lastName,
      email,
      password,
      major,
      year
    );

    if (isCredentialsValid != null) {
      res.redirect("/");
    } else {
       res
        .status(400)
        .render("signup", { error: "Username or password is invalid" });
      return;
    }
  } catch (e) {
    res.render("signup", { error: e });
  }
});

// 5. POST for Login
router.post("/login", async (req, res) => {
  try {
    let username = req.body["username"];
    let password = req.body["password"];

    username = username.trim();
    username = username.toLowerCase();
    password = password.trim();

    if (!username) {
      res.status(400).render("login", { error: "You must enter a username!" });
      return;
    }
    if (/\s/.test(username)) {
      res.status(400).render("login", { error: `Username has spaces` });
      return;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      res
        .status(400)
        .render("login", { error: `Only alphanumeric characters allowed!` });
      return;
    }
    if (username.length < 4) {
      res.status(400).render("login", {
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    if (!password) {
      res.status(400).render("login", { error: `You must enter a password!` });
      return;
    }
    if (/\s/.test(password)) {
      res.status(400).render("login", { error: `Password has spaces` });
      return;
    }
    if (password.length < 6) {
      res.status(400).render("login", {
        error: `Password must be atleast 6 characters long!`,
      });
      return;
    }
    const isCredentialsValid = await userFunctions.checkUser(
      username,
      password
    );

    if (isCredentialsValid != null) {
      // console.log(req.session.user);
      req.session.user = username;
      res.redirect("/dashboard");
    }else{
      res.render('login',{error: 'Either username or password is incorrect'})
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
  const userName = req.session.user; //this username the one who is logged in.
  console.log(req.session.user);
  try {
    const allPostDashboard = await dashboardData.getAllPosts();
    res.render("dashBoard", {
      title: userName.toLowerCase(),
      username: userName.toLowerCase(),
      posts: allPostDashboard,
    });
  } catch (e) {
    res.status(400).json({ error: "Post not found" });
    return;
  }
});

// Logout
router.get("/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.render("logout", { title: "Logged out" });
  } else {
    // console.log("logout");
    res.redirect("/");
  }
});

module.exports = router;
