const express = require('express');
const router = express.Router();
const userdata = require('../data/users')

router.get('/', async (req, res) => {
    try {
        res.render('pages/mainpage', { title: "homepage" });
      } catch (e) {
        res.sendStatus(500);
      }
    });
    
router.post('/login', async (req, res) => {
    
    const loginname = req.body.username;
    const loginpass = req.body.password;
    let mistakes=[]
    let checkCorrectness = false;
    if(!loginname){
        mistakes.push("username is not provided!")
    }
    if(!loginpass){
      mistakes.push("No password provided!")
    }

    if(loginname.substring(0,2)=='  '){
        mistakes.push("cannot have space as name input")
    }
    if(loginpass.substring(0,2)=='  '){
        mistakes.push("cannot have space as password input!")
    }

    if(mistakes.length>0){
        checkCorrectness= true;
    }
try{
    if(checkCorrectness){
      res.status(400).render('pages/mainpage',{ title: "homepage" , checkCorrectness: true,mistakes:mistakes})
    }
    else{const checkLogin = await userdata.checkUser(loginname,loginpass)
        if(checkLogin=='{authenticated: true}'){
        req.session.user = { username:loginname };
        res.redirect('/private');
        }
    }
}
catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get('/logout', async (req, res) => {
    try {
      req.session.destroy();
      res.render('pages/logout', { title: "logout page" });
    } catch (e) {
    res.sendStatus(500);
  }
});
module.exports = router;