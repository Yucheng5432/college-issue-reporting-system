const mongoCollections = require("../config/mongoCollections");
const commentsCollection = mongoCollections.comments;
const posts = mongoCollections.posts;
let { ObjectId } = require("mongodb");

// 1.Create a comment

async function createComment(userID, postID, userName, body) {
  if (arguments.length != 5) throw "Please provide all the parameters.";
  if (typeof userName != "string" || typeof body != "string")
    throw "Username or body is not string.";
  if (!ObjectId.isValid(postID) || !ObjectId.isValid(userID))
    throw "Invalid postID or userID";
  if (typeof body != "string") {
    throw "body is not string";
  }

  const allPosts = await posts();

  let commentData = {
    _id: new ObjectId(),
    userID: userID,
    postID: postID,
    userName: userName,
    body: body,
    date: new Date(),
    answer: false,
  };

  //   add the comment to the post collections
  let insertedComment = await allPosts.updateOne(
    { _id: postID },
    { $push: { comments: commentData } }
  );

  if (!insertedComment || insertedComment.modifiedCount === 0) {
    //Verify if comment was added
    throw "Comment  was not added.";
  }

  return { commentCreated: true };
}

// 2. Get all comments by post id.
async function getAllPostComments(postId) {
  if (!postId) {
    throw "Please provide the id.";
  }

  if (!Object.isValid(postId)) {
    throw "id is not valid object id";
  }
  const allPosts = await posts();

  const postFound = await allPosts.findOne({ _id: postId }).toArray();
  if (postFound === null) {
    throw "No post found with the given id.";
  }
  const commentData = postFound.comments.forEach((comments) => {
    return comments;
  });

  return commentData;
}

//4. get comment by id
async function getComment(id) {
  if (!id || !ObjectId.isValid(id)) throw "Invalid comment id.";

  const allPosts = await posts();

  let getPostById = await allPosts.findOne({ "comments._id": id });
  let comment = getPostById.comments.find((comment) => comment._id.equals(id));

  return comment;
}

// 5. delete a comment
async function deleteComment(cid) {
  if (!cid || !ObjectId.isValid(cid)) throw "Invalid comment id.";
  const allPosts = await posts();

  let post = await allPosts.findOne({ "comments._id": id });

  let removedComment = await post.updateOne(
    { _id: post._id },
    { $pull: { comments: { _id: id } } }
  );

  //   check if the comment was deleted.
  if (removedComment.deletedCount === 0) {
    throw "Unable to remove comment";
  }

  return true;
}

// 6. mark comment answer as true
async function markAsAnswer(cid) {
  if (!cid || !ObjectId.isValid(cid)) throw "Invaldi comment id.";

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
  getAllPostComments,
  getComment,
  deleteComment,
  markAsAnswer,
};
