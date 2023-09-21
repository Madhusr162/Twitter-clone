const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const usermodel = mongoose.model("UserModel");
const { JWT_SECRET } = require('../config');
const protectedRoute = require('../Middleware/protectedRoute');
const { use } = require('./TweetRoutes');
const tweetmodel = mongoose.model("TweetModel");


// register route to make the registration for the user
router.post("/register", function (req, res) {
    const { Name, UserName, Email, Password } = req.body;
    if (!Name || !UserName || !Email || !Password)
        return res.status(400).json({ error: "One or more mandatory field is missing" });
    usermodel.findOne({ Email: Email })
        .then((userInDB) => {
            if (userInDB)
                return res.status(500).json({ error: "User with this email already registered" });
            bcryptjs.hash(Password, 16)
                .then((hashedPassword) => {
                    const user = new usermodel({ Name, UserName, Email, Password: hashedPassword });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User signed up successfully" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
        })
        .catch((err) => {
            console.log(err);
        })
})

// login route to make the user login with the particular email and password which is already registered
router.post("/login", function (req, res) {
    const { UserName, Password } = req.body;
    if (!UserName || !Password)
        return res.status(400).json({ error: "One or more mandatory field is missing" });
    usermodel.findOne({ UserName: UserName })
        .then((userInDB) => {
            if (!userInDB)
                return res.status(401).json({ error: "Invalid Credentials" });
            bcryptjs.compare(Password, userInDB.Password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "E-mail": userInDB.Email, "UserName": userInDB.UserName, "id": userInDB._id, "Name": userInDB.Name, "Followers": userInDB.Followers, "Following": userInDB.Following, "ProfilePic": userInDB.ProfilePic, "Location": userInDB.Location, "DOB": userInDB.DOB  }
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                })
        })
        .catch((err) => {
            console.log(err);
        })
})

// To get a single user details
router.get("/user/:id", protectedRoute, (req, res) => {
    const id = req.params.id
    usermodel.findById(id).select('-Password')
        .populate("author", "_id Name UserName Email Followers Following DOB Location")
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(403).json({ error: "Invalid user." });
            }
            return res.status(200).json(userInDB);
        })
        .catch((err) => console.error(err));
})

// To follow user function
const followUser = async (req, res) => {
    try {
        const { id } = req.params; // ID of the user to follow
        const loggedInUserId = req.user.id; // Assuming you have implemented user authentication
        console.log(id);
        console.log(loggedInUserId)

        // Check if the user is trying to follow themselves
        if (id === loggedInUserId) {
            return res.status(400).json({ success: false, message: 'You cannot follow yourself' });
        }

        // Check if the user to follow exists
        const userToFollow = await usermodel.findById(id);
        if (!userToFollow) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user is already following the user to follow
        if (userToFollow.Followers.includes(loggedInUserId)) {
            return res.status(400).json({ success: false, message: 'You are already following this user' });
        }

        // Add the user to follow in the logged-in user's following array
        await usermodel.findByIdAndUpdate(loggedInUserId, { $push: { Following: id } });

        // Add the logged-in user in the user to follow's followers array
        await usermodel.findByIdAndUpdate(id, { $push: { Followers: loggedInUserId } });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error following user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Route to follow a user
router.post("/user/:id/follow", protectedRoute, followUser)

// Function to unfollow a user
const unfollowUser = async (req, res) => {
    try {
        const { id } = req.params; // ID of the user to unfollow
        const loggedInUserId = req.user.id; // Assuming you have implemented user authentication

        // Check if the user is trying to unfollow themselves
        if (id === loggedInUserId) {
            return res.status(400).json({ success: false, message: 'You cannot unfollow yourself' });
        }

        // Check if the user to unfollow exists
        const userToUnfollow = await usermodel.findById(id);
        if (!userToUnfollow) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the logged-in user is not following the user to unfollow
        if (!userToUnfollow.Followers.includes(loggedInUserId)) {
            return res.status(400).json({ success: false, message: 'You are not following this user' });
        }

        // Remove the user to unfollow from the logged-in user's following array
        await usermodel.findByIdAndUpdate(loggedInUserId, { $pull: { Following: id } });

        // Remove the logged-in user from the user to unfollow's followers array
        await usermodel.findByIdAndUpdate(id, { $pull: { Followers: loggedInUserId } });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Route to unfollow a user
router.post("/user/:id/unfollow", protectedRoute, unfollowUser)

// To edit user details
router.put("/user/:id/", protectedRoute, async (req, res) => {
    const loggedInUserId = req.user._id;
    const { Name, DOB, Location } = req.body;
    const userIdToUpdate = req.params.id;
    console.log(loggedInUserId,userIdToUpdate);
    try {
        if (loggedInUserId === userIdToUpdate) {
            if (!Name || !Location || !DOB) {
                return res.status(400).json({ error: "One or more mandatory field is missing" });
            } else {
                await usermodel.findByIdAndUpdate(userIdToUpdate, { Name, DOB, Location });
                res.status(201).json({ result: "Details updated" });
            }
        } else {
            return res.status(403).json({ error: "You are not allowed to edit other user details" });
        }
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
})

// To show all the tweets of the user
router.get("/user/:id/tweets", protectedRoute, async (req, res) => {
    try {
        const { id } = req.params.id; // ID of the user whose tweets to retrieve

        // Retrieve tweets posted by the specified user
        const userTweets = await tweetmodel.find({ TweetedBy: id }).exec();

        return res.status(200).json({ success: true, tweets: userTweets });
    } catch (error) {
        console.error('Error getting user tweets:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// // To upload the profile picture of the user
exports.uploadProfilePicture = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const { id } = req.params;
        const loggedInUserId = req.user.id; // Assuming you have implemented user authentication

        // Ensure that the logged-in user is uploading their own profile picture
        if (id !== loggedInUserId) {
            return res.status(403).json({ success: false, message: 'You are not allowed to upload profile pictures for other users.' });
        }

        // Get the file location where the image was saved by Multer
        const imagePath = req.file.path;

        // Update the user's profile picture in the database
        await usermodel.findByIdAndUpdate(id, { ProfilePic: imagePath });

        return res.status(200).json({ success: true, message: 'Profile picture uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
module.exports = router;