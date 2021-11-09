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
        //check if the variables are valid
        if (idArtista == "" || nombreArtista == "" || apellidoArtista == "") {
            res.status(400).send({
                message: "los valores no pueden estar vacios "
            });
            return;
        }
        //check if idArtist exists in database
        con.query("SELECT * FROM artistas WHERE id = ?", [idArtista], function (err, result) {
            if (err) {
                res.status(500).send({
                    message: "Error en la consulta"
                });
                return;
            }
            if (result.length > 0) {
                res.status(400).send({
                    message: "el idArtista ya existe"
                });
                return;
            }
            //insert new artist in database
            con.query("INSERT INTO artistas (id, nombre, apellido) VALUES (?, ?, ?)", [idArtista, nombreArtista, apellidoArtista], function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: "Error en la consulta"
                    });
                    return;
                }
                res.send({
                    message: "Artista creado",
                    idArtista: idArtista,
                    nombreArtista: nombreArtista,
                    apellidoArtista: apellidoArtista
                });
            });
        });
    }
}