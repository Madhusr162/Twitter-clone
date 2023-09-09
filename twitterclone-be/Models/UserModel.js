const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Defining the user schema
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    ProfilePic: {
        type: String
    },
    Location: {
        type: String
    },
    DOB: {
        type: Date
    },
    Followers: {
        type: [ObjectId],
        ref: "UserModel"
    },
    Following: {
        type: [ObjectId],
        ref: "UserModel"
    },
    author: {
        type: ObjectId,
        ref: "UserModel"
    }

}, { timestamp: true });

mongoose.model("UserModel", userSchema);
