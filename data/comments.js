const mongoCollections = require("../config/mongoCollections");
const commentsCollection = mongoCollections.comments;
const posts = mongoCollections.posts;
let { ObjectId } = require("mongodb");

// 1.Create a comment
//postID must be for a specific post
//Username will be user who is logged in
async function createComment(postID, userName, body) {
  if (typeof userName != "string") throw "Username  is not string.";
  if (!ObjectId.isValid(postID)) throw "Invalid postID";
  if (typeof body != "string") {
    throw "body is not string";
  }

  const allPosts = await posts();

  let commentData = {
    _id: new ObjectId(),
    postID: postID,
    userName: userName,
    body: body,
    date: new Date().toString(),
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
  console.log("inside comments", postId);
  if (!postId) {
    throw "Please provide the id.";
  }

  if (!ObjectId.isValid(postId)) {
    throw "id is not valid object id";
  }
  const allPosts = await posts();

  const postFound = await allPosts.findOne({ _id: postId }).toArray();
  console.log(postFound);
  if (postFound === null) {
    throw "No post found with the given id.";
  }
  const commentData = postFound.comments;

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
  console.log("Entering delete comment");
  console.log(cid);
  if (!cid || !ObjectId.isValid(cid)) throw "Invalid comment id.";
  const allPosts = await posts();
  let post = await allPosts.findOne({ "comments._id": cid });
  let removedComment = await allPosts.updateOne(
    { _id: post._id },
    { $pull: { comments: { _id: cid } } }
  );

  //   check if the comment was deleted.
  if (removedComment.deletedCount === 0) {
    throw "Unable to remove comment";
  }
  return true;
}

// 6. mark comment answer as true --done
async function markAsAnswer(cid) {
  if (!cid || !ObjectId.isValid(cid)) throw "Invalid comment id.";

  const allPosts = await posts();

  let post = await allPosts.findOne({ "comments._id": cid });

  // update the comment as resolved
  let updatedComment = await allPosts.updateOne(
    { _id: post._id, "comments._id": cid },
    { $set: { "comments.$.answer": true } }
  );

  if (updatedComment.modifiedCount === 0) {
    throw "Unable to update the comment answer.";
  } else {
    return { resolved: true };
  }
}

module.exports = {
  createComment,
  getAllPostComments,
  getComment,
  deleteComment,
  markAsAnswer,
};
