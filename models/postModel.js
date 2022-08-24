const mongoose = require('mongoose');

const PostSchema=new mongoose.Schema(
    {
        postID: {
            type:String,
            required:true
        },
        postText:{
            type:String,
            trim:true,
            maxlength:240,
        },
        postImage: {
            type:String,
        },
        likers: {
        type:[String],
        required:true,
        },
        coms:{
            type:[
                {
                    comID:String,
                    comEmail:String,
                    comText:String,
                    timestamp:Number,
                }
            ],
            required:true,
        }
    },
    {
        timestamps:true,
    }
    );
    module.exports=mongoose.model('post', PostSchema)