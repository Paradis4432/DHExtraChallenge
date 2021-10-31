const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dhchallenge'
});

module.exports = {
    createAlbum: function (req, res) {
        idAlbum = req.body.idAlbum;
        nombreAlbum = req.body.nombreAlbum;
        durationAlbum = req.body.durationAlbum;

        con.connect(function (err) {
            if (err) throw err;
            con.query("INSERT INTO albumes (id,nombre,duracion) VALUES (?,?,?)", [idAlbum,nombreAlbum,durationAlbum], function (err, result) {
                    if (err) throw err;
                    console.log("new album saved");
                });
        });
        res.send("new album added with id: " + idAlbum + ", name: " + nombreAlbum + ", duration: " + durationAlbum);
    }
}