const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("erreur id ");
  }).select("-password");
};

module.exports.userDelete = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id });
    return res.status(200).json({ message: "utilisateur supprimé" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.uploadProfil = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          image: `${req.protocol}://${req.get("host")}/public/images/${
            req.file.filename
          }`,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
