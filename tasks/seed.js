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
      "1",
      "rajpaynaik",
      "Scholarship not processed",
      "Please process my scholarship, its been 5 months.",
      "Urgent",
      ["financial", "stevens"],
      'public/images/imageDemo02.png'
    );

    console.log(firstPost);
  } catch (e) {
    console.log(e);
  }

  //   2. Create second post
  try {
    secondPost = await posts.addPost(
      "2",
      "Yash Koladia",
      "Courses not registered",
      "I am not able to register my courses on workday",
      "Urgent",
      ["registrar", "workday"],
      'public/images/imageDemo03.jpg'
    );

    console.log(secondPost);
  } catch (e) {
    console.log(e);
  }

  //   3. Create third post
  try {
    thirdPost = await posts.addPost(
      "3",
      "Yucheng Su",
      "Course selection question",
      "Has anyone taken the CS-554 course? Is this course difficult?",
      "Normal",
      ["course", "CS-554"],
      'public/images/imageDemo01.jpg'
    );

    console.log(thirdPost);
  } catch (e) {
    console.log(e);
  }

  //   4. Create fourth post
  try {
    fourthPost = await posts.addPost(
      "4",
      "Yinglu Wang",
      "Course selection question",
      "Is the school cafeteria open today?",
      "Normal",
      ["lunch", "cafeteria"],
    );

    console.log(fourthPost);
  } catch (e) {
    console.log(e);
  }

  await db.serverConfig.close();
  console.log("Done seeding the database");
};

main();
