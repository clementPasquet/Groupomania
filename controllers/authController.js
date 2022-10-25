const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { signUpErrors, loginErrors } = require("../utils/error");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await UserModel.create({ email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(500).send(errors);
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(500).json(errors);
  }
};
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};
