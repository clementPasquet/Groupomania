const UserModel = require("../models/userModel");
const postModel = require("../models/postModel");
const fs = require("fs");
const { postErrors } = require("../utils/error");

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
    const errors = postErrors(err);
    return res.status(400).json(errors);
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
  const update = {
    postText: req.body.postText,
  };
  postModel.findOne({ _id: req.params.id }).then((post) => {
    if (post.postID === req.body.userID || req.body.userAdmin === true) {
      postModel.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        { new: true },
        (err, data) => {
          if (!err) res.send(data);
          else console.log("erreur" + err);
        }
      );
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  });
};

module.exports.deletePost = (req, res) => {
  postModel.findOne({ _id: req.params.id }).then((post) => {
    if (post.postID === req.body.userID || req.body.isAdmin === true) {
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
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  });
};
module.exports.likePost = (req, res) => {
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
