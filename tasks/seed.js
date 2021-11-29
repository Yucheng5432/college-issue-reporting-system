const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const posts = data.posts;

const main = async () => {
  console.log("Into the seed file");
  const db = await dbConnection();
  //   await db.dropDatabase();

  let firstPost, secondPost, thirdPost;

  //   1. Create first post
  try {
    firstPost = await posts.addPost(
      "rajpaynaik",
      "Scholarship not processed",
      "Please process my scholarship, its been 5 months.",
      ["financial", "stevens"]
    );

    console.log(firstPost);
  } catch (e) {
    console.log(e);
  }

  //   2. Create second post
  try {
    secondPost = await posts.addPost(
      "rajpaynaik",
      "Courses not registered",
      "I am not able to register my courses on workday",
      ["registrar", "workday"]
    );

    console.log(secondPost);
  } catch (e) {
    console.log(e);
  }

  //   3. Create third post
  try {
    thirdPost = await posts.addPost(
      "lightyagami",
      "Scholarship not processed",
      "Please process my scholarship, its been 5 months.",
      ["financial", "stevens"]
    );

    console.log(thirdPost);
  } catch (e) {
    console.log(e);
  }

  await db.serverConfig.close();
  console.log("Done seeding the database");
};

main();
