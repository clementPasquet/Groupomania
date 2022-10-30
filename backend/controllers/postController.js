const UserModel = require("../models/userModel");
const postModel = require("../models/postModel");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

module.exports.createPost = async (req, res) => {
  let newPost = undefined;

  if (req.file) {
    newPost = new postModel({
      postID: req.body.postID,
      postText: req.body.postText,
      postImage: `public/images/${req.file.filename}`,
      likers: [],
      coms: [],
    });
  } else {
    newPost = new postModel({
      postID: req.body.postID,
      postText: req.body.postText,
      postImage: "",
      likers: [],
      coms: [],
    });
  }

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    console.log("erreur", err);
    return res.status(400).send(err);
  }
};

module.exports.getPosts = (req, res) => {
  postModel
    .find((err, data) => {
      if (!err) res.send(data);
      else console.log("Error" + err);
    })
    .sort([["createdAt", -1]]);
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  const update = {
    postText: req.body.postText,
  };
  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: update },
    { new: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log("erreur" + err);
    }
  );
};
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  postModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
      const path = data.postImage;
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    } else console.log("erreur" + err);
  });
};
module.exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    postModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send("erreur");
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send("erreur");
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.comsPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          coms: {
            commenterId: req.body.commenterId,
            commenterEmail: req.body.commenterEmail,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.comsUpdate = (req, res) => {
  console.log(req.params);
  try {
    return postModel.findById(req.params.id, (err, data) => {
      const thisComment = data.coms.find((com) =>
        com._id.equals(req.body.commentId)
      );
      if (!thisComment) return res.status(404).send(err);
      else {
        thisComment.text = req.body.text;
      }

      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.comsDelete = (req, res) => {
  try {
    return postModel.findByIdAndUpdate(
      req.params.id,

      {
        $pull: {
          coms: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else console.log(err);
      }
    );
  } catch (err) {
    return console.log(err);
  }
};
