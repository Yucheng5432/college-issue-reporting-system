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
  year,
  bio
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
      year == "" ||
      !bio ||
      bio == ""
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
      throw `Only alphanumeric values allowed for username`
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
    if(!email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      throw `Enter a valid email-id!!`
  }
    if (/\s/.test(email)) {
      throw `Email has spaces`;
    }
    if (typeof major != "string") {
      throw `Major must be a string`;
    }
    if (!year.match("^[0-9]+$")) {
      throw `Year must be numeric value`;
    }
    if (typeof year != "number") {
      throw `Year must be a number`;
    }

    if (typeof bio != "string") {
      throw `Bio must be a string`;
    }
    if (year > 2021) {
      throw "Year must be 2021 or before 2021!!";
    }
    if (year < 2017) {
      throw "Only students on or after year 2017 are allowed.";
    }
  } catch (e) {}
  const user = await usersCollection();
  //   const saltRounds = 5;
  const plainTextPassword = password;
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  let userData = {
    userName: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hash,
    major: major,
    year: year,
    bio: bio,
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
  } catch (e) {
    // console.log(e)
  }
  if (checkUsername) {
    let compareToMerlin = false;
    compareToMerlin = await bcrypt.compare(password, checkUsername.password);

    if (compareToMerlin) {
      // console.log(checkUsername)
      return checkUsername
      // return { authenticated: true };
    } else {
      throw "Either the username or password is invalid";
    }
  }
}
async function getUserbyUsername(userName) {
  if(typeof userName !== 'string'){
    throw `Username must be a string`
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
  const users = await usersCollection();
  let userData = await users.findOne({ userName: userName });
  if (!userData) {
    throw (
      `Cannot find user with given emai : ${email} into database`
    );
  }
  // console.log(userData)
  return userData;
}
//-------------------------------------------------------------------------------//
async function updateUser( userId,username, firstName, lastName, email, password, year) {
  userId = userId.trim()
  username = username.trim()
  firstName = firstName.trim()
  lastName = lastName.trim()
  email = email.trim()
  password = password.trim()
  
  if( typeof username != 'string' || typeof firstName != 'string'
      || typeof lastName != 'string' || typeof email != 'string' || typeof password != 'string' || typeof year !='string'
     ) {
      throw 'All fields must be string'
  }

  if( !userId ||userId == '' || !username || username == "" || !firstName || firstName == "" || !lastName || lastName == "" || !email || email =="" || !password || password == ''
    || !year || year == "" ){
         throw "Please enter all the fields"
     }
     if(typeof username != 'string'){
      throw `User name must be a string`
  }
  if(/\s/.test(username)) {
      throw `Username has spaces`
  }
  if(/\s/.test(userId)) {
    throw `userID has spaces`
}
  if(typeof firstName != 'string'){
      throw `First name must be a string`
  }
  if(/\s/.test(firstName)) {
      throw `Firstname has spaces`
  }
  if(typeof lastName != 'string'){
      throw `Last name must be a string`
  }
  if(/\s/.test(lastName)) {
      throw `Lastname has spaces`
  }
  if(!email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      throw `Enter a valid email-id!!`
  }
  if(/\s/.test(email)) {
      throw `Email has spaces`
  }
  // if(typeof major != 'string'){
  //     throw `Major must be a string`
  // }
  if(!year.match('^[0-9]+$')){
      throw `Year must be numeric value`
  }
  year = parseInt(year)
  if(typeof year != 'number'){
      throw `Year must be a number`
  }

  if(year > 2021){
      throw 'Year must be 2021 or before 2021!!'
  }
  if(year < 2017){
      throw 'Only students on or after year 2017 are allowed.'
  }
//Check whether id present in database
  idd = ObjectId(userId)
  let users = await usersCollection();
  let userData = await users.findOne({_id: idd });
  if (!userData) {
    throw (`Cannot find user with given id : ${username} into database`);
  }

  let userarr = await users.find({}).toArray()
//Check for same username in database
if(userData){
  userId = userData._id.toString()
  // console.log(userId)
  for(j =0; j < userarr.length; j++){
    userarr[j]._id = userarr[j]._id.toString()
     if(userarr[j]._id === userId){
        // console.log('HII')
         continue
     }
     if(userarr[j].userName === username){
         throw 'This User name is already in use with other user.'
     }
  }
}

//Check for email is in use with other user
// if(userData){
//   userId = userData._id.toString()
//   console.log(userId)
  for(i =0; i < userarr.length; i++){
     userarr[i]._id = userarr[i]._id.toString()
      if(userarr[i]._id === userId){
          continue
      }
      if(userarr[i].email === email){
          throw 'This email is already in use with other user.'
      }
  }
// }
const plainTextPassword = password;
const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  const updatedUserData = {
      userName: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      year: year, 
  }  
idd = userData._id
  let updatedUser = await users.updateOne(
    { _id: idd },
    { $set: updatedUserData }
  );


  let updatedData =  await users.findOne({_id: idd})
  updatedData._id = updatedData._id.toString()
  // console.log(updatedData)
  return updatedData
}

module.exports = { createUser, checkUser,getUserbyUsername,updateUser};
