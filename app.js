const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))

app.use(async (req, res, next) => {
    const now = new Date().toUTCString()
    if (req.session.user){
    console.log('['+now+']: '+req.method+ req.originalUrl+'(Authenticated User)');}
    else{
    console.log('['+now+']: '+req.method+ req.originalUrl+'(Non-Authenticated User)')    
    }
    next();
  });

app.use('/login', (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/private');
    } else {
      next();
    }
  });
app.use('/private', (req, res, next) => {
    if (!req.session.user) {
      return res.status(403).render('pages/notlogin',{ title: "Not Authenticated" });
    } else {
      next();
    }
  });
app.use('/signup', (req, res, next) => {
    if (req.session.user) {
        console.log(req.session.user)
      return res.redirect('/private');
    } else {
      next();
    }
  });



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});