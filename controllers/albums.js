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

        //check if variables are ""
        if (idAlbum == "" || nombreAlbum == "" || durationAlbum == "") {
            res.status(400).send({
                message: "Faltan datos"
            });
        } else {
            con.query("INSERT INTO albums (id, nombre, duracion) VALUES (?, ?, ?)", [idAlbum, nombreAlbum, durationAlbum], function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: "Error al crear el album"
                    });
                } else {
                    res.status(201).send({
                        message: "Album creado",
                        id: idAlbum,
                        nombre: nombreAlbum,
                        duracion: durationAlbum
                    });
                }
            });
        }

    }
}