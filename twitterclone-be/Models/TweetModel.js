const mongoose = require('mongoose');
const {ObjectId} =mongoose.Schema.Types;
const tweetSchema=new mongoose.Schema({
    Content:{
        type: String,
        required: true
    },
    TweetedBy:{
        type: ObjectId,
        ref: "UserModel"
    },
    Likes:[
        {
            type: ObjectId,
            ref:"UserModel"
        }
    ],
    RetweetBy:[
        {
            type: ObjectId,
            ref:"UserModel"
        }
    ],
    Image:{
        type: String
    },
    Replies:[
        {
            ReplyText: String,
            RepliedBy: {type: ObjectId, ref: "UserModel"}
        }
    ],
    author:{
        type: ObjectId,
        ref:"UserModel"
    }
},{timestamps:true});
mongoose.model("TweetModel", tweetSchema);