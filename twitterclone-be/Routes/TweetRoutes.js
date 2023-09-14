
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tweetmodel = mongoose.model("TweetModel");
const protectedRoute = require('../Middleware/protectedRoute');

router.post("/tweet", protectedRoute, (req, res) => {
    const { Content, Image } = req.body

    if (!Content) {
        return res.status(400).json({ error: "Content for the tweet is missing" });
    }
    const tweet = new tweetmodel({
        Content: Content,
        Image: Image,
        TweetedBy: req.user._id
    });
    tweet.save()
        .then((dbTweet) => {
            res.status(201).json({ success: true, tweet: dbTweet });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        });
});

router.put("/tweet/:id/like", protectedRoute, async (req, res) => {
    try {
        const tweetId = req.params.id;
        const userId = req.user._id;

        const tweet = await tweetmodel.findById(tweetId);

        if (!tweet) {
            return res.status(404).json({ success: false, message: "Tweet not found" });
        }

        if (tweet.Likes.includes(userId)) {
            return res.status(400).json({ success: false, message: "You have already liked this tweet" });
        }


        const updatedTweet = await tweetmodel.findByIdAndUpdate(
            tweetId,
            { $push: { Likes: userId } },
            { new: true }
        );

        res.json({
            success: true,
            message: "Tweet liked successfully",
            tweet: updatedTweet
        });
    } catch (error) {
        console.error("Error liking tweet:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.put("/tweet/:id/dislike", protectedRoute, async (req, res) => {
    try {
        const tweetId = req.params.id;
        const userId = req.user._id;

        const tweet = await tweetmodel.findById(tweetId);

        if (!tweet) {
            return res.status(404).json({ success: false, message: "Tweet not found" });
        }

        if (!tweet.Likes.includes(userId)) {
            return res.status(400).json({ success: false, message: 'You have not liked this tweet initially' });
        }

        const updatedTweet = await tweetmodel.findByIdAndUpdate(
            tweetId,
            { $pull: { Likes: userId } },
            { new: true }
        )
        res.json({
            success: true,
            message: "Tweet disliked successfully",
            tweet: updatedTweet
        });
    } catch (error) {
        console.error("Error disliking tweet:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get("/tweet/:id", protectedRoute, async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await tweetmodel.findById(id)
            .populate("TweetedBy", "-Password")
            .populate("Likes", "-Password")
            .populate("Replies")
        if (!tweet) {
            return res.status(404).json({ success: false, message: "Tweet not found" })
        }
        return res.status(200).json({ success: true, tweet: tweet });
    } catch (error) {
        console.error('Error fetching tweet details:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

router.get("/tweet/", protectedRoute, (req, res) => {
    tweetmodel.find().sort({ createdAt: 'desc' })
        .populate("TweetedBy", "-Password")
        .then((dbTweets) => {
            res.status(200).json({ tweets: dbTweets })
        })
        .catch((error) => {
            console.log(error);
        })
})

router.delete("/tweet/delete/:id", protectedRoute, async (req, res) => {
    try {
        const tweetId = req.params.id;
        const userId = req.user._id;
        const tweet = await tweetmodel.findById(tweetId)

        if (!tweet) {
            return res.status(400).json({ error: "Tweet does not exist" });
        }
        //check if the tweet author is same as loggedin user only then allow deletion
        if (tweet.TweetedBy._id.toString() === userId.toString()) {
            await tweet.deleteOne();
            return res.status(200).json({ success: true, message: "Tweet deleted successfully" });
        } else {
            return res.status(403).json({success: false, message:"you are not allowed to delete this tweet"})
        }
    }
    catch (error) {
        console.error("Error deleting tweet:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.post('/tweet/:id/retweet', protectedRoute, async (req, res) => {
    try {
        const { id } = req.params; // Get the tweet ID from the URL parameter
        const loggedInUserId = req.user._id; // Get the user's ID from the authentication middleware
        console.log(loggedInUserId)

        // Find the tweet by its ID
        const tweet = await tweetmodel.findById(id);

        // Check if the tweet exists
        if (!tweet) {
            return res.status(404).json({ success: false, message: 'Tweet not found' });
        }

        // Check if the user has already retweeted this tweet
        if (tweet.RetweetBy.some((user) => user.user.toString() === loggedInUserId.toString())) {
            return res.status(400).json({ success: false, message: 'You have already retweeted this tweet' });
        }

        // Add the user's ID to the retweets array
        tweet.RetweetBy.push({
            user: loggedInUserId,
            retweetedAt: new Date(),
        });

        // Save the tweet with the updated retweets array
        await tweet.save();

        return res.status(200).json({ success: true, message: 'Tweet retweeted successfully' });
    } catch (error) {
        console.error('Error retweeting tweet:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


module.exports = router;