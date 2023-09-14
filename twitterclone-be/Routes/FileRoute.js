const express = require('express');
const router = express.Router();
const protectedResource=require('../Middleware/protectedRoute')
const UserRoutes=require('../Routes/UserRoutes')

const multer=require("multer");

const storage=multer.diskStorage({
destination: (req,file,cb)=>{
    cb(null,"uploads/")
},
filename:(req,file,cb)=>{
    cb(null,`ProfilePic-${Date.now()}--${file.originalname}`)
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
router.post("/uploadFile", protectedResource, upload.single('file'), function(req,res){
    res.json({"fileName":req.file.filename});
});
router.post('/user/:id/uploadProfilePic', protectedResource, upload.single('ProfilePic'), function(req,res){
    UserRoutes.uploadProfilePicture
});
module.exports=router;