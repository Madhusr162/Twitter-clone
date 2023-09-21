const express = require('express');
const app=express();
var cors=require('cors');
const mongoose = require('mongoose');
const {MONGODB_URL} =require('./config')

mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", ()=>{
    console.log("DB connected");
});
mongoose.connection.on("error",()=>{
    console.log("Not able to connect to DB");
});
app.use(cors());
const corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type'],
  };
app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads',express.static('uploads'))
require('./Models/UserModel');
require('./Models/TweetModel');

app.use(require("./Middleware/protectedRoute"))

app.use(require('./Routes/UserRoutes'));
app.use(require('./Routes/TweetRoutes'));
app.use(require('./Routes/FileRoute'));


app.listen(5000,()=>{
    console.log("server started");
})