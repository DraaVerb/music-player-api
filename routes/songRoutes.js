const express = require("express");
const router = express.Router();

const {
    getSongs,
    createSong,
    deleteSong
} = require("../controllers/songController");

router.get("/songs", getSongs);
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

module.exports = router;