const express = require('express');
const router = express.Router();
const Song = require('../models/songmodel');

// GET all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🔹 GET songs by year
router.get('/year/:year', async (req, res) => {
    try {
        const songs = await Song.find({ year: req.params.year });

        if (songs.length === 0) {
            return res.status(404).json({ message: "No songs found for this year" });
        }

        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🔹 GET songs by artist
router.get('/artist/:artist', async (req, res) => {
    try {
        const songs = await Song.find({ artist: req.params.artist });

        if (songs.length === 0) {
            return res.status(404).json({ message: "No songs found for this artist" });
        }

        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET song by ID (taruh di bawah biar tidak bentrok)
router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new song
router.post('/', async (req, res) => {
    const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre
    });

    try {
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE song
router.put('/:id', async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // 🔥 pakai ini
            { new: true, runValidators: true }
        );

        if (!updatedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(updatedSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE song
router.delete('/:id', async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.json({ message: "Song deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;