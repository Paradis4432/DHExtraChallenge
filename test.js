var express = require('express');
var router = express.Router();

router.delete('/canciones/:id', function (req, res) {
    res.send('delete working');
    console.log(req.params.id);
  })

module.exports = router;