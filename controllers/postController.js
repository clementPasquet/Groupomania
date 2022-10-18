
const UserModel = require('../models/userModel');
const postModel = require('../models/postModel');
const ObjectID = require('mongoose').Types.ObjectId;
const fs =require('fs');

module.exports.createPost = async (req, res) => {
  if (req.file){
  
  const newPost = new postModel({
    postID: req.body.postID,
    postText: req.body.postText,
    postImage:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likers: [],
    coms: [],
  });
  console.log(newPost)
}
else {
  const newPost = new postModel({
    postID: req.body.postID,
    postText: req.body.postText,
    postImage:"",
    likers: [],
    coms: [],
  });
}

 
  try {
    
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getPost = (req, res) => {
    postModel.find((err, data) => {
        if (!err)
            res.send(data);
        else console.log("Error" + err);
    })

}

module.exports.updatePost = (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    const update = {
        postText: req.body.postText
    }
    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        { new: true },
        (err, data) => {
            if (!err) res.send(data);
            else console.log('erreur' + err)
        }
    )
}
module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    postModel.findByIdAndRemove(
        req.params.id,
        (err, data) => {
            if (!err) res.send(data);
            else console.log('erreur' + err);
        }
    )
}
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
        return res.status(400).send('ID unknown :' + req.params.id);

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
module.exports.comsPost =(req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

    try{
        return  postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push:{
                    coms:{
                        commenterId:req.body.commenterId,
                        commenterEmail:req.body.commenterEmail,
                        text:req.body.text,
                        timestamp:new Date().getTime()
                    }
                }
            },
         {new:true},
         (err,data)=>{
            if (!err) return res.send(data);
            else return res.status(400).send(err);
         }   
        )
    } catch (err){
        return res.status(400).send(err);
    }
};
module.exports.comsUpdate =(req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

    try{
      return postModel.findById(
        req.params.id,
        (err,data) =>{
           const comment=data.coms.find((coms) =>(
                com._id.equals(req.body.comId)
           ))
           if (!comment) return res.status(404).send(err);
           else {
            comment.text=req.body.text;
           } 

           return data.save((err) =>{
            if (!err) return res.status(200).send(data);
            return res.status(500).send(err);
           }
            
      )
    }
    )
  }
  catch(err){
      return res.status(400).send(err);
    }
};


module.exports.comsDelete =(req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

    try{
      return postModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull:{
            coms:{
              _id:req.body.comId
            }
          }
        },
        { new:true},
        (err,data) =>{
          if(!err) return res.send(data);
          else return res.status(400).send(err);
        }
      );
    }catch(err){
      return res.status(400).send(err);
    }
};