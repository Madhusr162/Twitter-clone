const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const tweetmodel = mongoose.model('TweetModel')
const protectedResource=require('../Middleware/protectedRoute')
const UserRoutes=require('../Routes/UserRoutes')

const multer=require("multer");

const storage=multer.diskStorage({
destination: (req,file,cb)=>{
    cb(null,"uploads/")
},
filename:(req,file,cb)=>{
    cb(null,`${Date.now()}--${file.originalname}`)
}
})

const upload=multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*1
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==="image/png"|| file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
            cb(null,true);
        }else{
            cb(null,false);
            return resizeBy.status(400).json({error: "File types allowed are .jpeg, .jpg, .png"});

        }
    }
})
// router.post('/user/:id/uploadProfilePic', protectedResource, upload.single('ProfilePic'), UserRoutes.uploadProfilePicture);
// router.get("/getall",async(req,res)=>{

//     try {
//         const data= await tweetmodel.find();
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send("Some Error Occured")
//     }
// })
// router.get("/files/:filename",downloadFile)
module.exports=router;