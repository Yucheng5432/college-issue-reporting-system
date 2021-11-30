const posts = require("../data/posts");
const comments = require("../data/comments");
const usersData = require("../data/users");
const dashboard = require("../data/dashboard");

module.exports = {
  users: usersData,
  posts: posts,
  comments: comments,
  dashboard: dashboard,
};
