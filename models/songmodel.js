const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    album:String,
    year:Number,
    genre:String,
    duration:Number
});

module.exports = mongoose.model("Song",songSchema);