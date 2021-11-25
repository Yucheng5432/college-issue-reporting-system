const mongoCollections = require("../config/mongoCollections");
const commentsCollection = mongoCollections.comments;
const objectId = require("mongodb").ObjectID;

// 1.Create comment
async function createComment(userID, postID, userName, body) {
  if (arguments.length != 5) throw "Please provide all the parameters.";
  if (typeof userName != "string" || typeof body != "string")
    throw "Username or body is not string.";
  if (!objectId.isValid(postID) || !objectId.isValid(userID))
    throw "Invalid postID or userID";

  let commentData = {
    userID: userID,
    postID: postID,
    userName: userName,
    body: body,
    date: new Date(),
    answer: false,
  };

  const comments = await commentsCollection();

  const insertedComment = await comments.insertOne(commentData);

  const newId = insertedComment._id;

  const comment = await this.getComment(newId);

  return comment;
}

// 2.Get all comments
async function getAllComments() {
  const comments = await commentsCollection();
  const commentData = await comments.find({}).toArray();

  return commentData;
}

// 3.get all posts comments
async function getAllPostComments(id) {
  if (!id) throw "Please provide postid parameter";

  const comments = await commentsCollection();
  const postData = await comments.find({ postID: objectId(id) }).toArray();

  return postData;
}

//4. get comment by id
async function getComment(id) {
  if (!id) throw "please provide comment id";

  const comments = await commentsCollection();
  const commentData = await comments.findOne({ _id: objectId(id) });

  return commentData;
}

module.exports = {
  createComment,
  getAllComments,
  getAllPostComments,
  getComment,
};
