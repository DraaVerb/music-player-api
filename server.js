const express = require("express");
const mongoose = require("mongoose");

const songRoutes = require("./routes/songRoutes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://draastrl_db_user:Thedoll07@ac-bczcvn0-shard-00-00.nxwcx6y.mongodb.net:27017,ac-bczcvn0-shard-00-01.nxwcx6y.mongodb.net:27017,ac-bczcvn0-shard-00-02.nxwcx6y.mongodb.net:27017/?ssl=true&replicaSet=atlas-i5zma0-shard-0&authSource=admin&appName=music-player-api")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/",(req,res)=>{
    res.send("Music Player API Running");
});

app.use("/songs",songRoutes);


app.listen(3000,()=>{
    console.log("Server running on port 3000");
});