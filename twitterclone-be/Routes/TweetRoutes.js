const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tweetmodel = mongoose.model("TweetModel");
const protectedRoute = require('../Middleware/protectedRoute');

router.post("/tweet", protectedRoute, (req, res) => {
    const { Content } = req.body;
    if (!Content)
        return res.status(400).json({ error: "Content for the tweet is missing" });
    tweetmodel.find(req.user._id)
        .then((dbTweets) => {
            res.status(200).json({ tweets: dbTweets })
        })
        .catch((error) => {
            console.log(error);
        })
    const tweet = new tweetmodel({ Content });
    tweet.save()
    //image upload
})
router.put("/tweet/:id/like", protectedRoute, (req, res) => {
    tweetmodel.findByIdAndUpdate(req.body.tweetId, {
        $push: { Likes: req.user._id }
    }, {
        new: true //returns updated record
    }).populate("author", "_id Name UserName")
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({ error: error })
            } else {
                res.json(result);
            }
        })
});
router.put("/tweet/:id/dislike", protectedRoute, (req, res) => {
    tweetmodel.findByIdAndUpdate(req.body.tweetId, {
        $pull: { Likes: req.user._id }
    }, {
        new: true //returns updated record
    }).populate("author", "_id Name UserName")
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({ error: error })
            } else {
                res.json(result);
            }
        })
});
router.put("/tweet/:id/reply", protectedRoute, (req, res) => {
    const reply  = {ReplyText: req.body.ReplyText, RepliedBy: req.user._id};
    tweetmodel.findByIdAndUpdate(req.body.tweetId, {
        $pull: { Replies: reply }
    }, {
        new: true //returns updated record
    }).populate("replies.RepliedBy", "_id Name UserName")//reply owner
    .populate("author", "_id Name UserName")//tweet owner
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({ error: error })
            } else {
                res.json(result);
            }
        })
    // add the new reply tweet id in the parent reply array
})
router.get("/tweet/:id", protectedRoute, (req, res) => {
    tweetmodel.find(req.params._id)
        .populate("TweetedBy", "_id Name UserName Email Followers Following DOB Location")
})
router.get("/tweet/", protectedRoute, (req, res) => {
    tweetmodel.find({ author: req.user._id }).sort({ createdAt: 'desc' }).exec()
        .populate("TweetedBy", "_id Name UserName Email Followers Following DOB Location")
        .then((dbTweets) => {
            res.status(200).json({ tweets: dbTweets })
        })
        .catch((error) => {
            console.log(error);
        })
})
router.delete("/tweet/:id", protectedRoute, (req, res) => {
    if (req.user._id === TweetedBy._id) {
        tweetmodel.find(tweets).deleteOne();
    }
})
router.post("/tweet/:id/retweet", protectedRoute, (req, res) => {
    retweetTweet = async (req, res) => {
        try {
            const { id } = req.params;
            const loggedInUserId = req.user._id;
    
            // Find the tweet by its ID and populate the 'retweets' field
            const tweet = await tweetmodel.findById(id).populate('retweets');
    
            // Check if the tweet exists
            if (!tweet) {
                return res.status(404).json({ success: false, message: 'Tweet not found' });
            }
    
            // Check if the user has already retweeted this tweet
            if (tweetmodel.retweets.some((userId) => userId.toString() === loggedInUserId.toString())) {
                return res.status(400).json({ success: false, message: 'You have already retweeted this tweet' });
            }
    
            // Add the user's ID to the retweets array
            tweet.retweets.push(loggedInUserId);
    
            // Save the tweet with the updated retweets array
            await tweet.save();
    
            return res.status(200).json({ success: true, message: 'Tweet retweeted successfully' });
        } catch (error) {
            console.error('Error retweeting tweet:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };

})


module.exports = router;