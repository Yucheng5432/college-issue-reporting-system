const userRoutes = require('./users');
const signupRoutes = require('./signup')
const privateRoutes = require('./private');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/signup',signupRoutes)
  app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};


module.exports = constructorMethod;