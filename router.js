const express = require('express');
const router = express.Router();
const songsController = require('./controllers/songs');

router.delete('/:id', songsController.deleteSongById);

router.put('/:id', songsController.editSong);

module.exports = router;