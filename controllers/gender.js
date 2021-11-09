const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dhchallenge'
});

module.exports = {
    findAll: function (req, res) {
        con.query('SELECT * FROM canciones INNER JOIN generos ON canciones.genero_id = generos.id ORDER BY generos.id', function (err, result, fields) {
            if (err){
                res.status(500).send(err);
                return
            }
            res.send(result);
        });
    },
    createGenero: function (req, res) {
        idGenero = req.body.idGenero;
        nombreGenero = req.body.nombreGenero;
        //check if variables are ""
        if (idGenero == "" || nombreGenero == "") {
            res.status(400).send("Error: id o nombre esta vacio");
        } else {
            //check if idGenero already exists
            con.query('SELECT * FROM generos WHERE id = ?', [idGenero], function (err, result, fields) {
                if (err) {
                    res.status(500).send({
                        message: "Error al validar el id"
                    });
                    return;
                }
                if (result.length > 0) {
                    res.status(400).send("Error: id ya existe");
                } else {
                    //insert into generos
                    con.query('INSERT INTO generos (id, nombre) VALUES (?, ?)', [idGenero, nombreGenero], function (err, result, fields) {
                        if (err) {
                            res.status(500).send({
                                message: "Error al crear el genero"
                            });
                            return
                        }
                        res.status(201).send({
                            info: "nuevo genero agregado",
                            id: idGenero,
                            nombre: nombreGenero
                        });
                    });
                }
            });
        }
    }
}