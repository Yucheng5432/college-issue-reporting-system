const userAuthentication = require("./users");
const postsRoutes = require("./posts");
const commentsRoutes = require("./comments");
const photoRoutes = require("./images");

const constructorMethod = (app) => {
  app.use("/", userAuthentication);
  app.use("/posts", postsRoutes);
  app.use("/comments", commentsRoutes);
  app.use("/photo", photoRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found." });
  });
};

module.exports = constructorMethod;
