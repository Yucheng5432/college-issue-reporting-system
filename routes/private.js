const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    try {
        res.render('pages/private', { title: "private",username:req.session.user.username });
      } catch (e) {
        res.sendStatus(500);
      }
      
    });

module.exports = router;
