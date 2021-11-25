const mongoCollections = require("../config/mongoCollections");
const usersCollection = mongoCollections.users;
const validator = require("validator");
const bcrypt = require('bcrypt')
const { ObjectID, ObjectId } = require("bson");

//Create a new user
async function createUser(username, firstName, lastName, email, password, major, year, bio){
  
    username = username.trim().toLowerCase()
    firstName = firstName.trim()
    lastName = lastName.trim()
    email = email.trim()
    password = password.trim()
    major = major.trim()    
    
 try{
    if(!username || username == "" || !firstName || firstName == "" || !lastName || lastName == "" || !email || email == "" || !password  || password == "" || 
        !major || major == "" || !year || year == "" || !bio || bio == ""){
        throw`You must enter all the fields`
    }
    if(typeof username != 'string'){
        throw `User name must be a string`
    }
    if(/\s/.test(username)) {
        throw `Username has spaces`
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
    if(!validator.isEmail(email)){
        throw `Enter a valid email-id!!`
    }
    if(/\s/.test(email)) {
        throw `Email has spaces`
    }
    if(typeof major != 'string'){
        throw `Major must be a string`
    }
    if(!year.match('^[0-9]+$')){
        throw `Year must be numeric value`
    }
    if(typeof year != 'number'){
        throw `Year must be a number`
    }
  
    if(typeof bio != 'string'){
        throw `Bio must be a string`
    }
    if(year > 2021){
        throw 'Year must be 2021 or before 2021!!'
    }
    if(year < 2017){
        throw 'Only students on or after year 2017 are allowed.'
    }
}catch(e){

}
    const user = await usersCollection()
    const saltRounds = 5
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
        bio: bio
    }

    sameUserName = await user.findOne({userName: username})
        if(sameUserName){
            throw `There is already a user with username ${username}`
        }
    sameEmail = await user.findOne({email: email})
        if(sameEmail){
            throw `This email is already in use! ${email}`
        }
     
    let newUser = await user.insertOne(userData);

    if(newUser.insertedCount == 0){
        throw `User addition failed`
    }
    const a = await user.find({_id: newUser.insertedId}).toArray()
    for(i in a){
        a[i]._id = a[i]._id.toString()
        return a[i]
    }

}
//------------------------------------------------------------------------------------------
// Login Code

async function checkUser(username, password){
    username = username.trim()
    username = username.toLowerCase()
    password = password.trim()
   
    if(!username){
        throw `You must enter a username!`
    }
    if(/\s/.test(username)) {
        throw `Username has spaces`
    }
    if(!username.match(/^[a-z0-9]+$/i)){
        throw `Only alphanumeric characters allowed!`
    }
    if(username.length < 4){
        throw `Length of username must be atleast 4 characters long!`
    }
    if(!password){
        throw`You must enter a password!`
    }
    if(/\s/.test(password)) {
        throw `Password has spaces`
    }
    if(password.length < 6){
        throw `Password must be atleast 6 characters long!`
    }
    const user = await usersCollection()
    const checkUsername = await user.findOne({userName:username})
    const checkPassword = await user.findOne({password:password})
    try{
    if(!checkUsername){
        throw `Either the username or password is invalid`
    }
}catch(e){
    // console.log(e)
}
    if(checkUsername){
        let compareToMerlin = false;
            compareToMerlin = await bcrypt.compare(password, checkUsername.password);
        
        if (compareToMerlin) {
            return {authenticated: true}
        } else {
            throw 'Either the username or password is invalid'
        }
    }
}
//---------------------------------------------------------------------------------------------
//Update user 
async function updateUser(userId, username, firstName, lastName, email, password, major, year, bio) {
    
    userId = userId.trim()
    username = username.trim()
    firstName = firstName.trim()
    lastName = lastName.trim()
    email = email.trim()
    password = password.trim()
    major = major.trim()
    bio = bio.trim()

    
    if(typeof userId != "string" || typeof username != 'string' || typeof firstName != 'string'
        || typeof lastName != 'string' || typeof email != 'string' || typeof password != 'string'
        || typeof major != 'string' || typeof bio != 'string') {
        throw 'All fields except year must be string'
    }

    if(!userId || userId == "" || !username || username == "" || !firstName || firstName == "" || !lastName || lastName == "" || !email || email =="" || !password || password == ''
       || !major || major == '' || !year || year == "" || !bio || bio == "" ){
           throw "Please enter all the fields"
       }
       if(typeof username != 'string'){
        throw `User name must be a string`
    }
    if(/\s/.test(username)) {
        throw `Username has spaces`
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
    if(!validator.isEmail(email)){
        throw `Enter a valid email-id!!`
    }
    if(/\s/.test(email)) {
        throw `Email has spaces`
    }
    if(typeof major != 'string'){
        throw `Major must be a string`
    }
    if(!year.match('^[0-9]+$')){
        throw `Year must be numeric value`
    }
    if(typeof year != 'number'){
        throw `Year must be a number`
    }
    if(typeof bio != 'string'){
        throw `Bio must be a string`
    }
    if(year > 2021){
        throw 'Year must be 2021 or before 2021!!'
    }
    if(year < 2017){
        throw 'Only students on or after year 2017 are allowed.'
    }
//Check whether id present in database
    idd = ObjectID(userId)
    let users = await usersCollection();
    let userData = await users.findOne({ _id: idd });
    if (!userData) {
      throw (`Cannot find user with given id : ${userId} into database`);
    }

    let userarr = await users.find({}).toArray()
//Check for same username in database

for(j =0; j < userarr.length; j++){
    userarr[j]._id = userarr[j]._id.toString()
     if(userarr[j]._id === userId){
         continue
     }
     if(userarr[j].userName === username){
         throw 'This User name is already in use with other user.'
     }
 }
    
//Check for email is in use with other user
    for(i =0; i < userarr.length; i++){
       userarr[i]._id = userarr[i]._id.toString()
        if(userarr[i]._id === userId){
            continue
        }
        if(userarr[i].email === email){
            throw 'This email is already in use with other user.'
        }
    }

    const updatedUserData = {
        userName: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        major: major,
        year: year, 
        bio: bio
    }  

    let updatedUser = await users.updateOne(
      { _id: idd },
      { $set: updatedUserData }
    );
    // if (updatedUser.modifiedCount == 0) {
    //   throw (`Unable to update user with id : ${userId} into database`);
    // }
  
    let updatedData =  await users.findOne({_id: idd})
    updatedData._id = updatedData._id.toString()
    return updatedData
  }

//---------------------------------------------------------------------------------------------
//Delete user

async function deleteUser(id) {
    id = id.trim()
    if(!id || id == ''){
        throw 'Please enter user id you want to delete'
    }
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        throw `Enter a valid object id`
    }
    const users = await usersCollection();
    objId = ObjectID(id)
    let removedUser = await users.deleteOne({ _id: objId });
  
    if (removedUser.deletedCount === 0) {
      throw `Unable to delete user with id : ${id} from database`;
    }
  
    return true;
  }

//Get user by id
async function getUserByID(id){
    const user = await usersCollection()
        id = id.trim()
        if (!id || id == "") {
          throw ("Id field must be supplied");
        }
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            throw `Enter a valid object id`
        }
      
        idd = ObjectId(id)
        const users = await usersCollection();
        let userData = await users.findOne({ _id: idd });
      
        if (!userData) {
          throw (`Cannot find user with given id : ${id} into database`);
        }else{
            userData._id = userData._id.toString()
            // console.log(userData)
            return userData;
        }

}
//---------------------------------------------------------------------------------------------------//



//Get all Ids
async function getAllUserIds() {
    mt = []
    const users = await usersCollection();
    const userIds = await users.find({}).toArray()
    for(i = 0; i < userIds.length; i++){
        userIds[i]._id = userIds[i]._id.toString()
        mt.push(userIds[i]._id)
    }
    if(mt.length === 0){
        return 'No users found in the database'
    }
    return mt
  }

//---------------------------------------------------------------------------------------------------//

async function getAllUsers() {
    const users = await usersCollection();
    const allUserData = await users.find({}).toArray();
    for(i = 0; i < allUserData.length; i++){
        allUserData[i]._id = allUserData[i]._id.toString()
    }
  
    if (allUserData.length === 0) {
      throw "No users found in database";
    }
    return allUserData;
  }

//---------------------------------------------------------------------------------------------------//

  async function getUserbyUsername(username) {
    const users = await usersCollection();
    let userData = await users.findOne({ userName: username });
    if(!username || username == ''){
        throw 'Please enter username'
    }
    if (!userData ) {
      return `Cannot find user with user name ${username}`
    }
    userData._id = userData._id.toString()
    return userData;
  }
//---------------------------------------------------------------------------------------------------//

module.exports = {
    createUser,
    getUserByID,
    deleteUser,
    getUserbyUsername,
    updateUser,
    getAllUserIds,
    getAllUsers,
    checkUser
}