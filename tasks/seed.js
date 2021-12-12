const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const posts = data.posts;
const users = data.users;
const comments = data.comments;
//const bcrypt = require("bcrypt");const saltRounds = 12;
const main = async () => {
  console.log("Into the seed file");
  const db = await dbConnection();
  //   await db.dropDatabase();
  let firstUser, secondUser, thirdUser,fourthUser;
  let post1,post2,post3,post4,post5,post6,post7,post8;
  //const hashpassword = await bcrypt.hash("123456",saltRounds);
  //let firstPost, secondPost, thirdPost;
  
  // create first User
  try{
    firstUser = await users.createUser(
      "user1",
      "Yucheng",
      "Su",
      "yuchengsu@gmail.com",
      "123456",
      "Computer Science",
      "2021"
    );
    console.log(firstUser);
  }catch(e){
    console.log(e);
  }

    // create second User
    try{
      secondUser = await users.createUser(
        "user2",
        "Raj",
        "Paynaik",
        "rajpaynaik@gmail.com",
        "123456",
        "Computer Science",
        "2020"
      );
      console.log(secondUser);
    }catch(e){
      console.log(e);
    }

    // create third User
    try{
      thirdUser = await users.createUser(
        "user3",
        "Yash",
        "Koladia",
        "yashkoladia@gmail.com",
        "123456",
        "Computer Science",
        "2021"
      );
      console.log(thirdUser);
    }catch(e){
      console.log(e);
    }

    // create fourth User
    try{
      fourthUser = await users.createUser(
        "user4",
        "Yinglu",
        "Wang",
        "yingluWang@gmail.com",
        "123456",
        "Computer Science",
        "2020"
      );
      console.log(fourthUser);
    }catch(e){
      console.log(e);
    }


  //   1. Create a post
  try {
    post1 = await posts.addPost(
      firstUser._id,
      "user1",
      "Course selection question",
      "Has anyone taken the CS-546 course? Is this course difficult?",
      "Normal",
      ["course", "question"],
      'public/images/image01.png'
    );
    console.log(post1);
  } catch (e) {
    console.log(e);
  }

 //   2. Create a post
  try {
     post2 = await posts.addPost(
      firstUser._id,
      "user1",
      "Courses not registered",
      "I am not able to register my courses on workday",
      "Urgent",
      ["registrar", "workday"],
      'public/images/image02.png'
    );
    console.log(post2);
  } catch (e) {
    console.log(e);
  }

  //   3. Create a post
  try {
    post3 = await posts.addPost(
      secondUser._id,
      "user2",
      "Medical Insurance",
      "How to use the medical insurance we purchased at school?",
      "Urgent",
      ["insurance", "stevens","question"],
      'public/images/imageDemo02.png'
    );
    console.log(post3);
  } catch (e) {
    console.log(e);
  }

  //   4. Create a post
  try {
    post4 = await posts.addPost(
      secondUser._id,
      "user2",
      "Lost my duck card",
      "I lost my duck card. My CWID is XXXXXX. Has anyone found it? My mobile number is XXX-XXXX-XXX, if you see it, please call this number to contact me. Thank you.",
      "Urgent",
      ["lost", "duck card","stevens"],
      'public/images/imageDemo01.png'
    );
    console.log(post4);
  } catch (e) {
    console.log(e);
  }

  //   5. Create a post
  try {
    post5 = await posts.addPost(
      thirdUser._id,
      "user3",
      "rent a parking space",
      "How to rent a parking space at school? How much one semester?",
      "Normal",
      ["parking", "stevens","question"],
    );
    console.log(post5);
  } catch (e) {
    console.log(e);
  }

  //   6. Create a post
  try {
    post6 = await posts.addPost(
      thirdUser._id,
      "user3",
      "Scholarship not processed",
      "Please process my scholarship, its been 5 months.",
      "Urgent",
      ["scholarship", "financial","stevens"],
      'public/images/image03.png'
    );
    console.log(post6);
  } catch (e) {
    console.log(e);
  }

  //   7. Create a post
  try {
    post7 = await posts.addPost(
      fourthUser._id,
      "user4",
      "A question about school cafeteria",
      "Is the school cafeteria open today?",
      "Normal",
      ["cafeteria", "question","stevens"],
    );
    console.log(post7);
  } catch (e) {
    console.log(e);
  }

  //   8. Create a post
  try {
    post8 = await posts.addPost(
      fourthUser._id,
      "user4",
      "Flood warning",
      "There will be flash floods tomorrow, schools will be closed, and all classes will be conducted online",
      "Normal",
      ["warning","stevens"],
      'public/images/image04.jpg'
    );
    console.log(post8);
  } catch (e) {
    console.log(e);
  }

  // 1.create a comment
  try {
    await comments.createComment(
      post1._id,
      "user2",
      "This course is very valuable, I recommend you to take this course."
    );
  } catch (e) {
    console.log(e);
  }

  // 2.create a comment
  try {
    await comments.createComment(
      post1._id,
      "user3",
      "I took this course last year. If you want to become a front-end engineer, this course will be very helpful to you."
    );
  } catch (e) {
    console.log(e);
  }

  // 3.create a comment
  try {
    await comments.createComment(
      post2._id,
      "user3",
      "I also had the same problem as you. Does anyone know the reason?"
    );
  } catch (e) {
    console.log(e);
  }
  
  //4.create a comment
  try {
    await comments.createComment(
      post2._id,
      "user4",
      "I think it is because you did not submit your study plan."
    );
  } catch (e) {
    console.log(e);
  }

   //5.create a comment
   try {
    await comments.createComment(
      post3._id,
      "user1",
      "You need to download a Aetna Health app."
    );
  } catch (e) {
    console.log(e);
  }

    //6.create a comment
    try {
      await comments.createComment(
        post3._id,
        "user4",
        "The school sent us an email about how to use our school insurance. You can check your email."
      );
    } catch (e) {
      console.log(e);
    }

      //7.create a comment
      try {
        await comments.createComment(
          post4._id,
          "user1",
          "You can cancel the previous duck card at the school and get a new one."
        );
      } catch (e) {
        console.log(e);
      }

       //8.create a comment
       try {
        await comments.createComment(
          post4._id,
          "user2",
          "I found my card!"
        );
      } catch (e) {
        console.log(e);
      }

       //9.create a comment
       try {
        await comments.createComment(
          post5._id,
          "user2",
          "The school’s parking spaces are in short supply, and now it’s late to rent. I think you may not be able to rent this semester."
        );
      } catch (e) {
        console.log(e);
      }

       //10.create a comment
       try {
        await comments.createComment(
          post6._id,
          "user4",
          "My scholarship was not sent to me too."
        );
      } catch (e) {
        console.log(e);
      }

      //11.create a comment
      try {
        await comments.createComment(
          post6._id,
          "user1",
          "Don’t worry, the school will send scholarships next month."
        );
      } catch (e) {
        console.log(e);
      }

       //12.create a comment
       try {
        await comments.createComment(
          post7._id,
          "user1",
          "Yes, the school cafeteria is open today."
        );
      } catch (e) {
        console.log(e);
      }

       //13.create a comment
       try {
        await comments.createComment(
          post7._id,
          "user2",
          "The food in the school cafeteria is delicious today."
        );
      } catch (e) {
        console.log(e);
      }
       //14.create a comment
       try {
        await comments.createComment(
          post8._id,
          "user2",
          "Got it thanks."
        );
      } catch (e) {
        console.log(e);
      }
       //15.create a comment
       try {
        await comments.createComment(
          post8._id,
          "user3",
          "Got it thanks."
        );
      } catch (e) {
        console.log(e);
      }

  await db.serverConfig.close();
  console.log("Done seeding the database");
};

main();
