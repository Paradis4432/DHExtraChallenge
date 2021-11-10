const express = require('express');
const router = express.Router();
const songsController = require('./controllers/songs');

router.delete('/:id', (req,res) => {
    //console.log(req.params.id);
    songsController.deleteSongById(req,res,req.params.id);
});
//router.put('/:id', songsController.editSong);
router.put('/:id', function(req, res) {
    console.log(req.params.id);
});


module.exports = router;