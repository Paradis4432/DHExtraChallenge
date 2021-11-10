const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dhchallenge'
});

module.exports = {
    findAll: function (req, res) {
        con.query('SELECT * FROM generos', function (err, result, fields) {
            if (err){
                res.status(500).send(err);
                return
            }
            let generos = result;
            let generos_json = [];
            for (let i = 0; i < generos.length; i++){
                con.query('SELECT * FROM canciones WHERE genero_id = ' + generos[i].id, function (err, result, fields) {
                    if (err){
                        res.status(500).send(err);
                        return
                    }
                    let canciones = result;
                    let canciones_json = [];
                    for (let j = 0; j < canciones.length; j++){
                        canciones_json.push({
                            id: canciones[j].id,
                            titulo: canciones[j].titulo,
                            duracion: canciones[j].duracion,
                            genero_id: canciones[j].genero_id,
                            album_id: canciones[j].album_id,
                            artista_id: canciones[j].artista_id
                        });
                    }
                    generos_json.push({
                        id: generos[i].id,
                        name: generos[i].name,
                        canciones: canciones_json
                    });
                    console.log("generos json inside loop")
                    console.log(generos_json);
                });
            }
            console.log("generos_json")
            console.log(generos_json);
            res.send({data: generos_json});
        }
        );
    },
    createGenero: function (req, res) {
        idGenero = req.body.idGenero;
        nombreGenero = req.body.nombreGenero;
        //check if variables are ""
        if (idGenero == "" || nombreGenero == "") {
            res.status(400).send({message: "id o nombre esta vacio"});
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
                    res.status(400).send({message: "Error: id ya existe"});
                } else {
                    //insert into generos
                    con.query('INSERT INTO generos (id, name) VALUES (?, ?)', [idGenero, nombreGenero], function (err, result, fields) {
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