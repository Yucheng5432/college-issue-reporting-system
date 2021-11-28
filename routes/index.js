const postsRoutes = require("./posts");
const commentsRoutes = require("./comments");
const users = require("./users");

const constructorMethod = (app) => {
  app.use("/", users);
  app.use("/posts", postsRoutes);
  app.use("/comments", commentsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found." });
  });
};

module.exports = constructorMethod;
