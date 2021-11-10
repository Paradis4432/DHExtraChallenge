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

        //check if variables are ""
        if (idSong == "" || tituloSong == "" || duracionSong == "" || generoSong == "" || albumSong == "" || artistaSong == "") {
            res.status(400).send({
                message: "Faltan datos"
            });
            return
        }
        else {
            //chefk if idSong exists
            con.query("SELECT * FROM canciones WHERE id = ?", [idSong], function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: "Error en la consulta"
                    });
                }
                else {
                    if (result.length > 0) {
                        res.status(400).send({
                            message: "El idSong ya existe"
                        });
                    }
                    else {
                        //insert new song
                        con.query("INSERT INTO canciones (id, titulo, duracion, created_at, updated_at, genero_id, album_id, artista_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [idSong, tituloSong, duracionSong, createdAt, updatedAt, generoSong, albumSong, artistaSong], function (err, result) {
                            if (err) {
                                res.status(500).send({
                                    message: "Error en la consulta"
                                });
                            }
                            else {
                                res.status(200).send({
                                    info: "nueva cancion agregada",
                                    idSong: idSong,
                                    tituloSong: tituloSong,
                                    duracionSong: duracionSong,
                                    createdAt: createdAt,
                                    updatedAt: updatedAt,
                                    generoSong: generoSong,
                                    albumSong: albumSong,
                                    artistaSong: artistaSong
                                });
                            }
                        });
                    }
                }
            });
        }
    },
    findOne: function (req, res) {
        idSong = req.query['search'];
        console.log(idSong);

        //check if idSong is ""
        if (idSong == "") {
            res.status(400).send({
                message: "Faltan datos"
            });
        } else {
            //check if idSong exists
            con.query("SELECT * FROM canciones WHERE id = ?", [idSong], function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: "Error en la consulta"
                    });
                }
                else {
                    if (result.length > 0) {
                        res.status(200).send({
                            info: "cancion encontrada",
                            result: result
                        });
                    }
                    else {
                        res.status(404).send({
                            message: "cancion no encontrada"
                        });
                    }
                }
            });
        }
    },
    editSong: function (req, res) {
        console.log("editing song");
        idSong = req.params.id;
        console.log("req params")
        console.log(req.params);
        console.log("req body")
        console.log(req.body);

        console.log(req.params.titulo);
        console.log(req.body.titulo)
        console.log(req.url);
        console.log(req.url.searchParams.get("titulo"));

        duracionSong = req.params.duracionSong;
        updatedAt = new Date();
        generoSong = req.params.generoSong;
        albumSong = req.params.albumSong;
        artistaSong = req.params.artistaSong;

        return

        //check if variables are ""
        if (idSong == "" || tituloSong == "" || duracionSong == "" || generoSong == "" || albumSong == "" || artistaSong == "") {
            res.status(400).send({
                message: "Faltan datos"
            });
        }
        else {
            //check if idSong exists
            con.query("SELECT * FROM canciones WHERE id = ?", [idSong], function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: "Error en la consulta"
                    });
                    
                }
                else {
                    if (result.length > 0) {
                        //update song

                        con.query("UPDATE canciones SET titulo = ?, duracion = ?, updated_at = ?, genero_id = ?, album_id = ?, artista_id = ? WHERE id = ?", [tituloSong, duracionSong, updatedAt, generoSong, albumSong, artistaSong, idSong], function (err, result) {
                            if (err) {
                                res.status(500).send({
                                    message: "Error en la consulta"
                                });
                                console.log(err);
                            }
                            else {
                                res.status(200).send({
                                    info: "cancion actualizada",
                                    result: result
                                });
                            }
                        });
                    }   
                    else {
                        res.status(404).send({
                            message: "cancion no encontrada"
                        });
                    }
                }
            });
        }
    },
    deleteSongById: function (req, res, idSong) {
        //idSong = req.params.id
        //console.log(idSong);
        //check if idSong is ""
        if (idSong == "") {
            res.status(400).send({  
                message: "faltan valores"
            });
        }
        else {
            //check if idSong exists
            con.query("SELECT * FROM canciones WHERE id = ?", [idSong], function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: "Error en la consulta"
                    });
                }
                else {
                    if (result.length > 0) {
                        //delete song
                        con.query("DELETE FROM canciones WHERE id = ?", [idSong], function (err, result) {
                            if (err) {
                                res.status(500).send({
                                    message: "Error en la consulta",
                                    err: err
                                });
                            }
                            else {
                                res.status(200).send({
                                    info: "cancion eliminada",
                                    idSong: idSong
                                });
                            }
                        });
                    }
                    else {
                        res.status(405).send({
                            message: "cancion no encontrada"
                        });
                    }
                }
            });
        }
    },
    findAll: function (req, res) {
        con.query("SELECT * FROM canciones", function (err, result) {
            if (err) {
                res.status(500).send({
                    message: "Error en la consulta"
                });
            }
            else {
                res.status(200).send({
                    info: "canciones encontradas",
                    songs: result
                });
            }
        });
    }
}