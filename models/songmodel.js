const mongoose = require("mongoose");

// SONG
const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    year: Number,
    genre: String,
    duration: Number
});

// PLAYLIST
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }
    ]
});

const Song = mongoose.model("Song", songSchema);
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Song, Playlist };