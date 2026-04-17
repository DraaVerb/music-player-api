const express = require('express');
const router = express.Router();
const { Song, Playlist } = require('../models/songmodel');


// ================= PLAYLIST =================

// Buat playlist
router.post('/playlists', async (req, res) => {
    try {
        const playlist = new Playlist({
            name: req.body.name
        });

        await playlist.save();
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ambil semua playlist
router.get('/playlists', async (req, res) => {
    try {
        const playlists = await Playlist.find().populate('songs');
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tambah lagu ke playlist
router.post('/playlists/:playlistId/songs/:songId', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if (!playlist.songs.includes(req.params.songId)) {
            playlist.songs.push(req.params.songId);
        }

        await playlist.save();

        res.json({ message: "Song added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Hapus lagu dari playlist
router.delete('/playlists/:playlistId/songs/:songId', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId);

        playlist.songs = playlist.songs.filter(
            song => song.toString() !== req.params.songId
        );

        await playlist.save();

        res.json({ message: "Song removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Hapus playlist
router.delete('/playlists/:playlistId', async (req, res) => {
    try {
        await Playlist.findByIdAndDelete(req.params.playlistId);
        res.json({ message: "Playlist deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ================= SONG =================

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


// ================= TAMBAHAN ENDPOINT =================

// ✅ 1. GET songs berdasarkan range tahun
router.get('/year-range', async (req, res) => {
    try {
        const { start, end } = req.query;

        const songs = await Song.find({
            year: { $gte: start, $lte: end }
        });

        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ 2. GET jumlah lagu dalam playlist
router.get('/playlists/:playlistId/count', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.json({ totalSongs: playlist.songs.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ================= SONG BY ID (HARUS PALING BAWAH) =================

// GET song by ID
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