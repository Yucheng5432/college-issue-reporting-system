const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
let { ObjectId } = require("mongodb");

// get post by id
async function getPost(postID) {
  if (!postID || !ObjectId.isValid(postID)) {
    throw "Post ID is invalid.";
  }
  // console.log("inside data", postID);
  try {
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectId(postID) });
    // console.log(post);
    if (!post) {
      throw `Post having ID ${postID} does not exist.`;
    }
    return post;
  } catch (error) {
    throw error.message;
  }
}

// get all posts
async function getAllPosts() {
  try {
    const postCollection = await posts();
    const allPosts = await postCollection.find({}).sort({ date: -1 }).toArray();
    let count = 0;
    let mt = [];
    let mt2 = [];
    for (i = 0; i < allPosts.length; i++) {
      // console.log(allPosts[i].priority)
      if (allPosts[i].priority === "Urgent") {
        mt.push(allPosts[i]);
        count++;
        // console.log(mt)
        if (count === allPosts.length) {
          allPosts.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          });
          return allPosts;
        }
      }
    }

    for (j = 0; j < allPosts.length; j++) {
      if (allPosts[j].priority === "Normal") {
        mt2.push(allPosts[j]);
        // console.log(mt)
      }
    }

    mt.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    mt2.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    let arr3 = mt.concat(mt2);
    // console.log(arr3)
    return arr3;
    return allPosts;
  } catch (error) {
    throw error.message;
  }
}

//Get users posts
async function getUserPosts(userName) {
  if (!userName) {
    //validates is userName is undefined or not
    throw "Username is empty";
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
    const allPosts = await postCollection
      .find({ username: userName })
      .sort({ date: -1 })
      .toArray();
    return allPosts;
  } catch (error) {
    throw error.message;
  }
}

// create a post
async function addPost(
  userName,
  postTitle,
  postBody,
  priority,
  postTags,
  image
) {
  //priority = priority.trim().toLowerCase();
  // if (arguments.length != 4) {
  //   throw "Incorrect number of arguments.";
  // }
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
  if (
    !priority ||
    typeof priority != "string" ||
    priority.trim("").length == 0
  ) {
    throw "Priority is invalid or empty.";
  }

  if (!priority.match("Urgent") && !priority.match("Normal")) {
    throw "Priority can only have yes or no.";
  }
  // console.log(image);

  if (image === undefined || !image) {
    let image = false;
  }

  try {
    const postCollection = await posts();

    let newPost = {
      //Define new post
      title: postTitle,
      body: postBody,
      tags: postTags,
      username: userName,
      priority: priority,
      resolved: false,
      date: new Date().toString(),
      image: image,
      comments: [],
    };

    const addNewPost = await postCollection.insertOne(newPost);

    if (!addNewPost || addNewPost.insertedCount == 0) {
      //Verify if post was added
      throw "Post was not added.";
    }

    return await this.getPost(addNewPost.insertedId.toString()); //Return newly added post
  } catch (error) {
    throw error.message;
  }
}
// addPost("aaaa","night","night","yes","#sh")

//delete a post
async function deletePost(postID) {
  if (!postID || !ObjectId.isValid(postID)) {
    throw "Post ID is invalid.";
  }
  try {
    const postCollection = await posts();
    const postToDelete = await this.getPost(postID); //Get details of post to delete
    const post = await postCollection.removeOne({ _id: ObjectId(postID) });
    if (!post || post.deletedCount == 0) {
      throw `Post with ID ${postID} was not deleted.`;
    }
    return { deleted: true };
  } catch (error) {
    throw error.message;
  }
}

// edit a post
async function editPost(
  postID,
  postTitle,
  postBody,
  postTags,
  postPriority,
  imagePath1
) {
  // console.log(postID, postTitle);
  if (!postID || !ObjectId.isValid(postID)) {
    throw "Post ID is invalid.";
  }
  if (postTitle && typeof postTitle != "string") {
    throw "Post title should be of type string.";
  }
  if (postBody && typeof postBody != "string") {
    throw "Post body should be of type string.";
  }

  console.log(imagePath1);
  try {
    const postCollection = await posts();

    const oldPost = await postCollection.findOne({ _id: ObjectId(postID) });
    // console.log(oldPost);

    let editedTitle = postTitle ? postTitle : oldPost.title; //Set existing title if not provided
    let editedBody = postBody ? postBody : oldPost.body;
    let editedTag = postTags ? postTags : oldPost.tags;
    let oldPostTag = oldPost.tags
    // console.log(editedTag)
    for(i in editedTag){

    }
    let editedPriority = postPriority ? postPriority : oldPost.priority;
    let date = new Date().toString(); //Set existing body if not provided
    let editImage = imagePath1 ? imagePath1 : oldPost.image;
    if(editedTag[i].trim().length != 0){
     editedPost = await postCollection.updateOne(
      { _id: ObjectId(postID) },
      {
        $set: {
          title: editedTitle,
          body: editedBody,
          tags: editedTag,
          priority: editedPriority,
          date: date,
          image: editImage,
        },
      }
    );
    }else{
       editedPost = await postCollection.updateOne(
        { _id: ObjectId(postID) },
        {
          $set: {
            title: editedTitle,
            body: editedBody,
            tags: oldPostTag,
            priority: editedPriority,
            date: date,
            image: editImage,
          },
        }
      );
    }
    if (!editedPost || editedPost.modifiedCount === 0) {
      throw "Failed to edit post.";
    }

    let post = await this.getPost(postID);
    return post;
  } catch (error) {
    throw error.message;
  }
}
// editPost("61afd6973e6e42f8774ca938","2nd edit","Check for tags update","#check","yes")

// mark post as resolve
async function resolvePost(postID, commentID) {
  if (
    !postID ||
    !ObjectId.isValid(postID) ||
    !commentID ||
    !ObjectId.isValid(commentID)
  ) {
    throw "Post ID is invalid.";
  }
  try {
    const postCollection = await posts();
    const postToResolve = await postCollection.findOne({
      _id: ObjectId(postID),
    });
    let resolveComments = postToResolve.comments.map((e) =>
      e._id.equals(ObjectId(commentID)) ? ((e.answer = true), e) : e
    );
    const post = await postCollection.updateOne(
      { _id: ObjectId(postID) },
      { $set: { resolved: !postToResolve.resolved, comments: resolveComments } }
    );
    if (!post || post.modifiedCount === 0) {
      throw "Error, could not resolve post.";
    }
  } catch (error) {
    throw error.message;
  }
}

// find post by search term
async function findPostsbySearchterm(searchterm) {
  console.log("searchTerm", searchterm);
  if (!searchterm) throw "No Search Term provided";
  const postCollection = await posts();
  //let phrase = '"' + searchterm + '"';
  const searchedPosts = await postCollection
    .find({ tags: { $elemMatch: { $eq: searchterm } } })
    .toArray();
  //  .aggregate([{ $match: { $text: { $search: phrase } } }]).toArray();
  //console.log(searchedPosts+"is from data");
  //console.log(searchedPosts);
  return searchedPosts;
}

module.exports = {
  addPost,
  getUserPosts,
  getAllPosts,
  getPost,
  deletePost,
  editPost,
  findPostsbySearchterm,
  resolvePost,
};
