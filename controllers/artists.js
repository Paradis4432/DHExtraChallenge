const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dhchallenge'
});

module.exports = {
    createArtist: function (req, res) {
        idArtista = req.body.idArtista;
        nombreArtista = req.body.nombreArtista;
        apellidoArtista = req.body.apellidoArtista;

        con.connect(function (err) {
            if (err) throw err;
            con.query("INSERT INTO artistas (id,nombre,apellido) VALUES (?,?,?)", [idArtista, nombreArtista,apellidoArtista], function (err, result) {
                    if (err) throw err;
                    console.log("new artists saved");
                });
        });
        res.send("new artist added with id: " + idArtista + ", name: " + nombreArtista + ", lastName: " + apellidoArtista);

    }
}