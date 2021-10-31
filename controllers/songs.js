const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dhchallenge'
});

module.exports = {
    createSong: function (req, res) {
        idSong = req.body.idSong;
        tituloSong = req.body.tituloSong;
        duracionSong = req.body.duracionSong;
        createdAt = new Date();
        updatedAt = new Date();
        generoSong = req.body.generoSong;
        albumSong = req.body.albumSong;
        artistaSong = req.body.artistaSong;

        //con.connect(function (err) {
        //if (err) throw err;
        con.query("INSERT INTO canciones (id, titulo, duracion, created_at, updated_at, genero_id, album_id, artista_id) VALUES (?,?,?,?,?,?,?,?)",
            [idSong, tituloSong, duracionSong, createdAt, updatedAt, generoSong, albumSong, artistaSong], function (err, result) {
                if (err) throw err;
                console.log("new song saved");
            });
        //});
        //res.send with all variables
        res.send({
            info: "new song saved",
            idSong: idSong,
            tituloSong: tituloSong,
            duracionSong: duracionSong,
            createdAt: createdAt,
            updatedAt: updatedAt,
            generoSong: generoSong,
            albumSong: albumSong,
            artistaSong: artistaSong
        });
    },
    findOne: function (req, res) {
        idSong = req.query['search'];
        console.log(idSong);

        con.query("SELECT * FROM canciones WHERE id = ?", [idSong], function (err, result) {
            if (err) throw err;
            console.log("song found");
            res.send({ result });

        });
    }
}