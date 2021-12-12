const mongoCollections = require("../config/mongoCollections");
const usersCollection = mongoCollections.users;
const bcrypt = require("bcrypt");
let { ObjectId } = require("mongodb");
const saltRounds = 12;

async function createUser(
  username,
  firstName,
  lastName,
  email,
  password,
  major,
  year
) {
  username = username.trim().toLowerCase();
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();
  major = major.trim();

  try {
    if (
      !username ||
      username == "" ||
      !firstName ||
      firstName == "" ||
      !lastName ||
      lastName == "" ||
      !email ||
      email == "" ||
      !password ||
      password == "" ||
      !major ||
      major == "" ||
      !year ||
      year == ""
    ) {
      throw `You must enter all the fields`;
    }
    if (typeof username != "string") {
      throw `User name must be a string`;
    }
    if (/\s/.test(username)) {
      throw `Username has spaces`;
    }
    if (!username.match(/^[a-z0-9]+$/i)) {
      throw `Only alphanumeric values allowed for username`;
    }
    if (username.trim("").length < 4) {
      throw "Length of username should me greater than 4 characters";
    }

    if (typeof firstName != "string") {
      throw `First name must be a string`;
    }
    if (/\s/.test(firstName)) {
      throw `Firstname has spaces`;
    }
    if (typeof lastName != "string") {
      throw `Last name must be a string`;
    }
    if (/\s/.test(lastName)) {
      throw `Lastname has spaces`;
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      throw `Enter a valid email-id!!`;
    }
    if (/\s/.test(email)) {
      throw `Email has spaces`;
    }
    if (major.trim("").length === 0 || typeof major != "string") {
      throw `Major must be a string`;
    }
    if (typeof parseInt(year) != "number") {
      throw `Year must be a number`;
    }

    if (year > 2021) {
      throw "Year must be 2021 or before 2021!!";
    }
    if (year < 2017) {
      throw "Only students on or after year 2017 are allowed.";
    }

    const user = await usersCollection();
    const plainTextPassword = password;
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    let userData = {
      userName: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      major: major,
      year: parseInt(year),
    };

    sameUserName = await user.findOne({ userName: username });
    if (sameUserName) {
      throw `There is already a user with username ${username}`;
    }
    sameEmail = await user.findOne({ email: email });
    if (sameEmail) {
      throw `This email is already in use! ${email}`;
    }

    let newUser = await user.insertOne(userData);

    if (newUser.insertedCount == 0) {
      throw `User addition failed`;
    }
    const a = await user.find({ _id: newUser.insertedId }).toArray();
    for (i in a) {
      a[i]._id = a[i]._id.toString();
      return a[i];
    }
  } catch (e) {
    throw e;
  }
}

async function checkUser(username, password) {
  username = username.trim();
  username = username.toLowerCase();
  password = password.trim();

  if (!username) {
    throw `You must enter a username!`;
  }
  if (/\s/.test(username)) {
    throw `Username has spaces`;
  }
  if (!username.match(/^[a-z0-9]+$/i)) {
    throw `Only alphanumeric characters allowed!`;
  }
  if (username.length < 4) {
    throw `Length of username must be atleast 4 characters long!`;
  }
  if (!password) {
    throw `You must enter a password!`;
  }
  if (/\s/.test(password)) {
    throw `Password has spaces`;
  }
  if (password.length < 6) {
    throw `Password must be atleast 6 characters long!`;
  }
  const user = await usersCollection();
  const checkUsername = await user.findOne({ userName: username });
  const checkPassword = await user.findOne({ password: password });
  try {
    if (!checkUsername) {
      throw `Either the username or password is invalid`;
    }

    if (checkUsername) {
      let compareToMerlin = false;
      compareToMerlin = await bcrypt.compare(password, checkUsername.password);

      if (compareToMerlin) {
        return checkUsername;
      } else {
        throw "Either the username or password is invalid";
      }
    }
  } catch (e) {
    throw e;
  }
}
async function getUserbyUsername(userName) {
  if (typeof userName !== "string") {
    throw `Username must be a string`;
  }
  if (/\s/.test(userName)) {
    throw `Username has spaces`;
  }
  if (!userName.match(/^[a-z0-9]+$/i)) {
    throw `Only alphanumeric characters allowed!`;
  }
  if (userName.length < 4) {
    throw `Length of username must be atleast 4 characters long!`;
  }
  try {
    const users = await usersCollection();
    let userData = await users.findOne({ userName: userName });
    if (!userData) {
      throw `Cannot find user with given emai : ${email} into database`;
    }
    return userData;
  } catch (e) {
    throw e;
  }
}

async function updateUser(
  userId,
  username,
  firstName,
  lastName,
  email,
  major,
  password,
  year
) {
  userId = userId.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();
  major = major.trim();

  if (
    (firstName && typeof firstName != "string") ||
    (lastName && typeof lastName != "string") ||
    (email && typeof email != "string") ||
    (password && typeof password != "string") ||
    (year && typeof year != "string") ||
    (major && typeof major != "string")
  ) {
    throw "All fields must be string";
  }

  if (/\s/.test(userId)) {
    throw `userID has spaces`;
  }
  if (firstName && typeof firstName != "string") {
    throw `First name must be a string`;
  }
  if (/\s/.test(firstName)) {
    throw `Firstname has spaces`;
  }
  if (lastName && typeof lastName != "string") {
    throw `Last name must be a string`;
  }
  if (/\s/.test(lastName)) {
    throw `Lastname has spaces`;
  }
  if (
    email &&
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    throw `Enter a valid email-id!!`;
  }
  if (/\s/.test(email)) {
    throw `Email has spaces`;
  }
  if (
    major &&
    !major.match("Computer Science") &&
    !major.match("Business") &&
    !major.match("Engineering") &&
    !major.match("System-and-Analytics") &&
    !major.match("Mechanical Engineering") &&
    !major.match("Chemical Engineering") &&
    !major.match("Material Science")
  ) {
    throw `Major must be from the following fields only
    Computer Science, Business, Engineering, System-and-Analytics,
    Mechanical Engineering, Chemical Engineering, Material Science`;
  }

  year = parseInt(year);
  if (year && typeof year != "number") {
    throw `Year must be a number`;
  }

  if (year && year > 2021) {
    throw "Year must be 2021 or before 2021!!";
  }
  if (year && year < 2017) {
    throw "Only students on or after year 2017 are allowed.";
  }
  //Check whether id present in database
  try {
    idd = ObjectId(userId);
    let users = await usersCollection();
    let userData = await users.findOne({ _id: idd });
    if (!userData) {
      throw `Cannot find user with username: ${username} into database`;
    }

    let userarr = await users.find({}).toArray();
    //Check for same username in database
    if (userData) {
      userId = userData._id.toString();
      for (j = 0; j < userarr.length; j++) {
        userarr[j]._id = userarr[j]._id.toString();
        if (userarr[j]._id === userId) {
          continue;
        }
        if (userarr[j].userName === username) {
          throw "This User name is already in use with other user.";
        }
      }
    }

    for (i = 0; i < userarr.length; i++) {
      userarr[i]._id = userarr[i]._id.toString();
      if (userarr[i]._id === userId) {
        continue;
      }
      if (userarr[i].email === email) {
        throw "This email is already in use with other user.";
      }
    }
    let updatedUserData;
    oldPassword = userData.password;
    firstName = firstName ? firstName : userData.firstName;
    lastName = lastName ? lastName : userData.lastName;
    email = email ? email : userData.email;
    major = major ? major : userData.major;
    year = year ? year : userData.year;
    const plainTextPassword = password;
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    if (password) {
      updatedUserData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        major: major,
        year: year,
      };
      idd = userData._id;
      let updatedUser = await users.updateOne(
        { _id: idd },
        { $set: updatedUserData }
      );
    } else {
      updatedUserData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: oldPassword,
        major: major,
        year: year,
      };

      idd = userData._id;
      let updatedUser = await users.updateOne(
        { _id: idd },
        { $set: updatedUserData }
      );
    }

    let updatedData = await users.findOne({ _id: idd });
    updatedData._id = updatedData._id.toString();
    return updatedData;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createUser,
  checkUser,
  getUserbyUsername,
  updateUser,
};
