const axios = require("axios");

async function getAllPosts() {
  const { data } = await axios.get("http://localhost:3000/posts");
  // console.log(data);

  return data;
}

async function getAllPostsByUserName(username) {
  const { data } = await axios.get(
    `http://localhost:3000/posts/userPosts/${username}`
  );
  // console.log(data);

  return data;
}

async function getProfilePhotoByUserName(username) {
  const { data } = await axios.get(
    `http://localhost:3000/photo/upload/${username}`
  );

  return data;
}

module.exports = {
  getAllPosts,
  getAllPostsByUserName,
  getProfilePhotoByUserName,
};
