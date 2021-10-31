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
    },
    editSong: function (req, res) {
        console.log("editing song");
        idSong = req.body.idSong;
        tituloSong = req.body.tituloSong;
        duracionSong = req.body.duracionSong;
        updatedAt = new Date();
        generoSong = req.body.generoSong;
        albumSong = req.body.albumSong;
        artistaSong = req.body.artistaSong;

        console.log(req.body)


        //debug all variables
        console.log("id " + idSong);
        console.log("titulo " + tituloSong);
        console.log("duracion " + duracionSong);
        console.log("genero " + generoSong);
        console.log("album " + albumSong);
        console.log("artista " + artistaSong);

        //update values in database
        con.query("UPDATE canciones SET titulo = ?, duracion = ?, updated_at = ?, genero_id = ?, album_id = ?, artista_id = ? WHERE id = ?",
            [tituloSong, duracionSong, updatedAt, generoSong, albumSong, artistaSong, idSong], function (err, result) {
                if (err) throw err;
                console.log("song updated");
                res.send({ result });
            });


    },
    deleteSongById: function (req, res) {
        idSong = req.params.id
        console.log(idSong);

        con.query("DELETE FROM canciones WHERE id = ?", [idSong], function (err, result) {
            if (err) throw err;
            console.log("song deleted");
            res.send({ result });

        });
    }
}