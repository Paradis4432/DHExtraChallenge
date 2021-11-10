

module.exports = {
    home: function(req,res) {
        //console.log("rendering home");
        res.render('home');
    },
    editSong: function(req,res) {
        //console.log("rendering editSong");
        console.log(req.params.id);
        res.render('editSong', {id: req.params.id});
    }

};

