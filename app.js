const express = require("express");
const cors = require("cors");

const app = express();
const configRoutes = require("./routes");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const session = require('express-session')
app.use(express.json());



const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number') return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);


app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
app.use(cors());

configRoutes(app);
let portNum = 5000;
app.listen(portNum, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on http://localhost:${portNum}`);
});
