const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const session = require("express-session");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(async (req, res, next) => {
  const currentTimestamp = new Date().toUTCString();
  const requestMethod = req.method;
  const route = req.originalUrl;
  let user = "Non-Authenticated User";
  if (req.session.user) {
    user = "Authenticated User";
  }
  console.log(`[${currentTimestamp}]: ${requestMethod} ${route} (${user}) `);
  next();
});

// app.use("/private", async (req, res, next) => {
//   // console.log(req.session);
//   if (!req.session.user) {
//     return res.status(403).render("notLogin", { title: "Not Authorised" });
//   } else {
//     next();
//   }
// });

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
