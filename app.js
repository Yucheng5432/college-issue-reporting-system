const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const session = require("express-session");
var methodOverride = require("method-override");
const multer = require("multer");
const path = require("path");
const Handlebars = require("handlebars")

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("image");

app.use(upload);

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use(methodOverride("_method"));
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/public", static);
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

app.use("/dashboard", async (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render("notLogin", { title: "Not Authorised" });
  } else {
    next();
  }
});

Handlebars.registerHelper( "when",function(operand_1, operator, operand_2, options) {
  var operators = {
   'eq': function(l,r) { return l == r; },
   'noteq': function(l,r) { return l != r; },
   'gt': function(l,r) { return Number(l) > Number(r); },
   'or': function(l,r) { return l || r; },
   'and': function(l,r) { return l && r; },
   '%': function(l,r) { return (l % r) === 0; }
  }
  , result = operators[operator](operand_1,operand_2);

  if (result) return options.fn(this);
  else  return options.inverse(this);
});

Handlebars.registerHelper("setVar", function(varName, varValue, options) {
  options.data.root[varName] = varValue;
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
