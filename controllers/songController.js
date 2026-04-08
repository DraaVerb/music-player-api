const Song = require("../models/songmodel");

exports.getSongs = async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
};

exports.createSong = async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.json(song);
};

exports.deleteSong = async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted" });
};