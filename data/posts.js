const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const { objectId } = require("mongodb");

async function addPost(userName, postTitle, postBody, postTags, postDate) {
  if (arguments.length != 5) {
    throw "Incorrect number of arguments.";
  }
  if (
    !postTitle ||
    typeof postTitle != "string" ||
    postTitle.trim("").length == 0
  ) {
    throw "Post title is invalid or empty.";
  }
  if (
    !postBody ||
    typeof postBody != "string" ||
    postBody.trim("").length == 0
  ) {
    throw "Post body is invalid or empty.";
  }
  if (
    !userName ||
    typeof userName != "string" ||
    userName.trim("").length == 0
  ) {
    throw "Username is invalid or empty.";
  }

  try {
    const postCollection = await posts();

    let newPost = {
      //Define new post
      title: postTitle,
      body: postBody,
      tags: postTags,
      username: userName,
      resolved: false,
      date: postDate,
      image: {},
      comments: [],
    };

    const addNewPost = await postCollection.insertOne(newPost);

    if (!addNewPost || addNewPost.insertedCount == 0) {
      //Verify if post was added
      throw "Post was not added.";
    }

    // return await this.getPost(addNewPost.insertedId.toString()); //Return newly added post
  } catch (error) {
    throw error.message;
  }
}

module.exports = {
  addPost,
};
