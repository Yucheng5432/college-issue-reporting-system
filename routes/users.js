const express = require("express");
const router = express.Router();
const data = require("../data");
const userFunctions = data.users;
const dashboardData = data.dashboard;
const postFunctions = require("../data/posts");
let myid = ''

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

// router.get("/myprofile", async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(500).json({ error: "No request body provided!" });
//     }
//     const posts = await postFunctions.getUserPosts();
//     return res.status(200).json(posts);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

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
      res.status(404).render("signup", { hasErrors: true, error: "Must supply username!." });
      return;
    }
    if (/\s/.test(username)) {
      res.status(400).render("signup", {  hasErrors: true,error: `Username has spaces` });
      return;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      res.status(400).render("signup", { hasErrors: true,
        error: `Only alphanumeric characters allowed!`,
      });
      return;
    }
    if (username.length < 4) {
      res.status(400).render("signup", { hasErrors: true,
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    if (!password) {
      res.status(404).render("signup", {  hasErrors: true,error: "Must supply password!" });
      return;
    }
    if (/\s/.test(password)) {
      res.status(400).render("signup", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (password.length < 6) {
      res.status(400).render("signup", { hasErrors: true,
        error: `Password must be atleast 6 characters long!`,
      });
      return;
    }
    if (!firstName) {
      res.status(404).render("signup", { hasErrors: true, error: "Must supply firstname!." });
      return;
    }
    if (/\s/.test(firstName)) {
      res.status(400).render("signup", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!lastName) {
      res.status(404).render("signup", { hasErrors: true, error: "Must supply lastname!" });
      return;
    }
    if (/\s/.test(lastName)) {
      res.status(400).render("signup", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!email) {
      res.status(404).render("signup", {  hasErrors: true,error: "Must supply email!" });
      return;
    }
    if (/\s/.test(email)) {
      res.status(400).render("signup", {  hasErrors: true,error: `Email has spaces` });
      return;
    }
    if(!email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      res.status(400).render("signup", {  hasErrors: true,error: `Enter valid email-id` });
      return;
    }
    if (!major) {
      res.status(404).render("signup", {  hasErrors: true,error: "Must supply major!" });
      return;
    }
    if (/\s/.test(major)) {
      res.status(400).render("signup", { hasErrors: true, error: `Major has spaces` });
      return;
    }
    if (!year) {
      res.status(404).render("signup", { hasErrors: true, error: "Must supply year!" });
      return;
    }
    if (/\s/.test(year)) {
      res.status(400).render("signup", {  hasErrors: true,error: `Year has spaces` });
      return;
    }
    if (typeof year != "number") {
      res
        .status(400)
        .render("signup", { hasErrors: true, error: "Year must be of type number" });
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
        .render("signup", {  hasErrors: true,error: "Username or password is invalid" });
      return;
    }
  } catch (e) {
    res.render("signup", { hasErrors: true, error: e });
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
      res.status(400).render("login", { hasErrors: true, error: "You must enter a username!" });
      return;
    }
    if (/\s/.test(username)) {
      res.status(400).render("login", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      res
        .status(400)
        .render("login", {  hasErrors: true,error: `Only alphanumeric characters allowed!` });
      return;
    }
    if (username.length < 4) {
      res.status(400).render("login", { hasErrors: true,
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    if (!password) {
      res.status(400).render("login", {  hasErrors: true,error: `You must enter a password!` });
      return;
    }
    if (/\s/.test(password)) {
      res.status(400).render("login", { hasErrors: true, error: `Password has spaces` });
      return;
    }
    if (password.length < 6) {
      res.status(400).render("login", { hasErrors: true,
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
      req.session.id = isCredentialsValid._id
      myid = isCredentialsValid._id.toString()
      res.redirect("/dashboard");
    }else{
      res.render('login',{ hasErrors: true,error: 'Either username or password is incorrect'})
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
  // console.log(req.session.user);
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

// get all posts by username
router.get("/myprofile", async (req, res) => {
  const userName = req.session.user;

  // console.log("Inside profilePage", userName);
  try {
    if (userName != null) {
      const myPosts = await dashboardData.getAllPostsByUserName(userName);
      const user = await userFunctions.getUserbyUsername(userName)
      res.status(200).render("myprofile", {
        title: userName.toLowerCase(),
        username: userName.toLowerCase(),
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        major: user.major,
        year: user.year,
        bio: user.bio,
        myPosts: myPosts,
      });
    }
  } catch (e) {
    res.status(400).json({ error: "Users Post not able to display." });
    return;
  }
});

//   try {
//     if (userName != null) {
//       const myPosts = await dashboardData.getAllPostsByUserName(userName);
//       const user = await userFunctions.getUserbyUsername(userName)
//       res.status(200).render("myprofile", {
//         title: userName.toLowerCase(),
//         username: userName.toLowerCase(),
//         firstname: user.firstName,
//         lastname: user.lastName,
//         email: user.email,
//         major: user.major,
//         year: user.year,
//         myPosts: myPosts,
//       });
//     }
//   } catch (e) {
//     res.status(400).json({ error: "Users Post not able to display." });
//     return;
//   }
// });


//------------------------------------------------------------------------------------------//
//
router.post("/myprofile", async (req, res) => {
  
// });

  // const userName = req.session.user;
  // try {
    // if (userName != null) {
      // const myPosts = await dashboardData.getAllPostsByUserName(userName);
      // const user = await userFunctions.getUserbyUsername(userName)
      res.redirect("editProfile") 
        // title: user.userName,
        // username: userName.toLowerCase(),
        // firstname: user.firstName,
        // lastname: user.lastName,
        // email: user.email,
        // major: user.major,
        // year: user.year,
        // myPosts: myPosts,
  // );
    // }
  //  catch (e) {
  //   res.status(400).json({ error: "Users Post not able to display." });
  //   return;
  // }
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
//------------------------------------------------------------------------------------------//

router.get('/editProfile', async (req,res)=>{
  if (!req.session.user) {
    res.render("login", { title: "Login Page" });
  } else {
    res.status(200).render("editProfile");
  }
})
//------------------------------------------------------------------------------------------//
router.post("/editProfile", async (req, res) => {
  try {
    let username = req.body["username"].trim().toLowerCase();
    let password = req.body["password"].trim();
    let firstName = req.body["firstname"].trim();
    let lastName = req.body["lastname"].trim();
    let email = req.body["email"].trim();
    // let major = req.body["major"].trim();
    let year = req.body["year"].trim();
    // let bio = req.body["bio"];
    year = parseInt(year);
    if (!username) {
      res.status(404).render("editProfile", { hasErrors: true, error: "Must supply username!." });
      return;
    }
    if (/\s/.test(username)) {
      res.status(400).render("editProfile", {  hasErrors: true,error: `Username has spaces` });
      return;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      res.status(400).render("editProfile", { hasErrors: true,
        error: `Only alphanumeric characters allowed!`,
      });
      return;
    }
    if (username.length < 4) {
      res.status(400).render("editProfile", { hasErrors: true,
        error: `Length of username must be atleast 4 characters long!`,
      });
      return;
    }
    if (!password) {
      res.status(404).render("editProfile", {  hasErrors: true,error: "Must supply password!" });
      return;
    }
    if (/\s/.test(password)) {
      res.status(400).render("editProfile", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (password.length < 6) {
      res.status(400).render("editProfile", { hasErrors: true,
        error: `Password must be atleast 6 characters long!`,
      });
      return;
    }
    if (!firstName) {
      res.status(404).render("editProfile", { hasErrors: true, error: "Must supply firstname!." });
      return;
    }
    if (/\s/.test(firstName)) {
      res.status(400).render("editProfile", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!lastName) {
      res.status(404).render("editProfile", { hasErrors: true, error: "Must supply lastname!" });
      return;
    }
    if (/\s/.test(lastName)) {
      res.status(400).render("editProfile", { hasErrors: true, error: `Username has spaces` });
      return;
    }
    if (!email) {
      res.status(404).render("editProfile", {  hasErrors: true,error: "Must supply email!" });
      return;
    }
    if (/\s/.test(email)) {
      res.status(400).render("editProfile", {  hasErrors: true,error: `Email has spaces` });
      return;
    }
    if(!email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      res.status(400).render("editProfile", {  hasErrors: true,error: `Enter valid email-id` });
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
    if (!year) {
      res.status(404).render("editProfile", { hasErrors: true, error: "Must supply year!" });
      return;
    }
    if (/\s/.test(year)) {
      res.status(400).render("editProfile", {  hasErrors: true,error: `Year has spaces` });
      return;
    }
    if (typeof year != "number") {
      res
        .status(400)
        .render("editProfile", { hasErrors: true, error: "Year must be of type number" });
      return;
    }
    year = year.toString()
    const isCredentialsValid = await userFunctions.updateUser(
      myid,
      username,
      firstName,
      lastName,
      email,
      password,
      year
    );

    if (isCredentialsValid != null) {
      req.session.user = username
      res.redirect("/myprofile");
    } else {
       res
        .status(400)
        .render("editProfile", {  hasErrors: true,error: "error" });
      return;
    }
  } catch (e) {
    res.render("editProfile", { hasErrors: true, error: e });
  }
});


module.exports = router;
