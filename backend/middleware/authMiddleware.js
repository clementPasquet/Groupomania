const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.getToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(res.locals.user.id);

        next();
      }
    });
  } else {
    console.log("No token");
  }
};
