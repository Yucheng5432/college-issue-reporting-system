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

  //   inserting the comment
  const insertedComment = await comments.insertOne(commentData);

  const newId = insertedComment._id;

  if (!insertedComment || insertedComment.insertedCount === 0) {
    //Verify if comment was added
    throw "Comment  was not added.";
  }

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
  if (!id || !objectId.isValid(id)) throw "Please provide postid parameter.";

  const comments = await commentsCollection();
  const postData = await comments.find({ postID: objectId(id) }).toArray();

  return postData;
}

//4. get comment by id
async function getComment(id) {
  if (!id || !objectId.isValid(id)) throw "Invalid comment id.";

  const comments = await commentsCollection();
  const commentData = await comments.findOne({ _id: objectId(id) });

  return commentData;
}

// 5. delete a comment
async function deleteComment(cid) {
  if (!cid || !objectId.isValid(cid)) throw "Invalid comment id.";
  const comments = await commentsCollection();

  let removedComment = await comments.removeOne({ _id: objectId(cid) });

  //   check if the comment was deleted.
  if (removedComment.deletedCount === 0) {
    throw "Unable to remove comment";
  }

  return true;
}

// 6. mark comment answer as true
async function markAsAnswer(cid) {
  if (!cid || !objectId.isValid(cid)) throw "Invaldi comment id.";
  const comments = await commentsCollection();

  comments = await this.getComment(cid);
  comments["answer"] = true;

  let updatedComment = await comments.updateOne(
    { _id: comments._id },
    { $set: comments }
  );

  //   check if the comment answer was updated
  if (updatedComment.modifiedCount === 0) {
    throw "Unable to update the comment answer.";
  }

  return await this.getComment(cid);
}

module.exports = {
  createComment,
  getAllComments,
  getAllPostComments,
  getComment,
  deleteComment,
  markAsAnswer,
};
