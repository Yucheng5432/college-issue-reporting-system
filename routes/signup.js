const express = require('express');
const router = express.Router();
const userdata = require('../data/users')

router.get('/', async (req, res) => {
    try {
        res.render('pages/signup', { title: "signup page" });
      } catch (e) {
        res.sendStatus(500);
      }
    });


router.post('/', async (req, res) => {
    const signname = req.body.username;
    const signpass = req.body.password;
    let mistakes=[]
    let checkCorrectness = false;   


    if(!signname){
        mistakes.push("input for signup username is empty")
    }
    if(signname.substring(0,2)==''){
        mistakes.push("space cannot be your username input")
    }
      
    if(!signpass){
        mistakes.push("no password is entered")
    }

    if(signpass.substring(0,2)=='  '){
        mistakes.push("space cannot be your password input")
    }

    if(mistakes.length>0){
        checkCorrectness = true;
    }
  try {     
      if(checkCorrectness){
          res.status(400).render('pages/signup',{ title: "signup page" , checkCorrectness: true,mistakes:mistakes})
      }   
      else{    
          const checkSignup = await userdata.createUser(signname,signpass)
          if(checkSignup=='{userInserted:true}'){
          res.redirect('/');
          } 
      }
  }
  catch(e){
      res.status(500).json({ message: e });
      }
    });

module.exports = router;