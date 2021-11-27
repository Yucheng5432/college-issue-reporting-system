const postsRoutes = require("./posts");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
  app.use("/posts", restaurantsRoutes);
  app.use("/comments", reviewsRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404).json({ error: "Route not found." });
  });
};

module.exports = constructorMethod;
