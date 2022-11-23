module.exports= (req, res, next) => {
    console.log(req.session);
  global.loggedIn = req.session.userId ? true : false;
  next();
} 