const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 15;

let exportedMethods ={
    async createUser(username, password){
        if(!username) throw "You must give a username!"
        if(!password) throw "You must give a password!"

        if (typeof(username)!=='string') throw "username input is not a string"
        if (typeof(password)!=='string') throw "password input is not a string"

        if(username.length<4) throw "username length should be at least 4 characters long"
        if(username.substring(0,2)==" ") throw "input password are space"
        if(password.length<6) throw "password length should be at least 6 characters long"

   
        for(let i=0;i<password.length;i++){
        if(password[i]==' ') throw 'password can not be spaces!'
        }
        //password加密
        const passwordCollection = await bcrypt.hash(password, saltRounds);
        let casetestName = username.toLowerCase();
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        for(let i=0;i<userList.length;i++){
            if(userList[i].username.toLowerCase()==casetestName) throw 'username already existed in our system, please change one'
        }
        let newUser = {
            username: username,
            password: passwordCollection,
            firstName:firstName,
            lastName: lastName,
            email:email
        };

        const newUserInfo = await userCollection.insertOne(newUser);
        if (newUserInfo.insertedCount === 0) throw 'Insert failed!';
            return '{userInserted:true}';
    },
    async checkUser(username, password) {
        if(!username) throw "You must give a username!"
        if(!password) throw "You must give a password!"

        if (typeof(username)!=='string') throw "username input is not a string"
        if (typeof(password)!=='string') throw "password input is not a string"

        if(username.length<4) throw "username length should be at least 4 characters long"
        if(username.substring(0,2)==" ") throw "input password are space"
        if(password.length<6) throw "password length should be at least 6 characters long"

        for(let i=0;i<password.length;i++){
            if(password[i]==' ') throw 'password can not be spaces!'
        }
        let match = false;
        const userCollection = await users();
        const searchUser = await userCollection.findOne({ username: username });
        if (!searchUser) throw 'either the entered username or password does not match';
        match = await bcrypt.compare(password, searchUser.password);
        if(!match) throw 'either the entered username or password does not match';
        return '{authenticated: true}'
    }
}
module.exports = exportedMethods;
