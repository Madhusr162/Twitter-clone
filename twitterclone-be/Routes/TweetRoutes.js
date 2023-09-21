
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tweetmodel = mongoose.model("TweetModel");
const protectedRoute = require('../Middleware/protectedRoute');

router.post("/tweet", protectedRoute, async (req, res) => {
    const {Image, Content}=req.body
    if (!Content) {
        return res.status(400).json({ error: "Content for the tweet is missing" });
    }else{
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
    }
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

router.post("/tweet/:id/reply", protectedRoute, async (req, res) => {
    try {
        const { id } = req.params; // Get the parent tweet's ID from the URL parameter
        const userId = req.user._id; // Get the user's ID from the authentication middleware
        const { Content } = req.body; // Get the reply content from the request body

        // Find the parent tweet by its ID
        const parentTweet = await tweetmodel.findById(id);

        // Check if the parent tweet exists
        if (!parentTweet) {
            return res.status(404).json({ success: false, message: 'Parent tweet not found' });
        }

        // Create a new reply tweet
        const replyTweet = new tweetmodel({
            Content,
            TweetedBy: userId,
        });

        // Save the reply tweet to the database
        await replyTweet.save();

        // Add the ID of the new reply tweet to the parent tweet's replies array
        parentTweet.Replies.push(replyTweet._id);

        // Save the updated parent tweet data to the database
        await parentTweet.save();

        return res.status(200).json({ success: true, message: 'Tweet replied successfully', Replies: replyTweet });
    } catch (error) {
        console.error('Error replying to tweet:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

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
router.get("/mytweet/", protectedRoute, (req, res) => {
    tweetmodel.find({ TweetedBy: req.user._id }).sort({ createdAt: 'desc' })
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
            return res.status(403).json({ success: false, message: "you are not allowed to delete this tweet" })
        }
    }
    catch (error) {
        console.error("Error deleting tweet:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.post('/tweet/:id/retweet', protectedRoute, async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.user._id;

        // Check if the tweet ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid tweet ID' });
        }

        // Find the tweet by its ID
        const tweet = await tweetmodel.findById(id);

        // Check if the tweet exists
        if (!tweet) {
            return res.status(404).json({ success: false, message: 'Tweet not found' });
        }

        // Check if the tweet has a retweets property (ensure it's an array)
        if (!Array.isArray(tweet.RetweetBy)) {
            tweet.RetweetBy = []; // Initialize it as an empty array if it doesn't exist
        }

        // Check if the user has already retweeted this tweet
        if (tweet.RetweetBy.some(RetweetBy => RetweetBy.user.toString() === loggedInUserId.toString())) {
            return res.status(400).json({ success: false, message: 'You have already retweeted this tweet' });
        }

        // Add the user's ID to the retweets array
        tweet.RetweetBy.push(loggedInUserId);

        // Save the tweet with the updated retweets array
        await tweet.save();

        // Include all retweet details in the response
        const retweetDetails = tweet.RetweetBy.map(RetweetBy => ({
            _id: RetweetBy._id, // Include any unique identifier for retweets
            user: RetweetBy.user, // Include user information if needed
            // Include other retweet properties you want to return
        }));

        return res.status(200).json({ success: true, message: 'Tweet retweeted successfully', retweets: retweetDetails });
    } catch (error) {
        console.error('Error retweeting tweet:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



module.exports = router;