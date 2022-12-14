module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "email incorrect";
  if (err.message.includes("password"))
    errors.password = "le mot de passe doit faire 6 caracteres minimum";

  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "email déja enregistré";

  return errors;
};

module.exports.loginErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "email inconnu";
  if (err.message.includes("password"))
    errors.password = "le mot de passe ne correspond pas";

  return errors;
};

module.exports.postErrors = (err) => {
  let errors = { errors: "" };

  if (err.message.includes("Post"))
    errors.errors = "veuillez ne pas dépasser 140 caractéres";

  return errors;
};
