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

// GET songs by year
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

// SEARCH song by title
router.get('/search/:title', async (req, res) => {
    try {
        const songs = await Song.find({
            title: { $regex: req.params.title, $options: 'i' }
        });

        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET songs by artist
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

// GET songs by genre
router.get('/genre/:genre', async (req, res) => {
    try {
        const songs = await Song.find({ genre: req.params.genre });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET song by ID (harus paling bawah)
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
    try {
        const song = new Song(req.body);
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE song
router.put('/:id', async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
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