const express = require('express');
const fs = require("fs");
const mysql = require('mysql');

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'dhchallenge'
});

renders = {
    canciones: function(req,res) {
        console.log("rendering canciones");
        fs.readFile("./cancionesTest.json", "utf8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }
            res.send(jsonString);
          });
    },
    createSong: function(req,res) {
        console.log("rendering createSong");
        res.render("createSong");
    },
    addCancion: function(id,nombre){
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("INSERT INTO canciones (id,titulo,duracion,created_at,updated_at,genero_id,album_id, artista_id) VALUES (8,2,3,4/4/2020,5/5/2020,6,7,8)",
            [id,nombre], function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
          });
    },
    generos: function(req,res) {
        console.log("rendering generos");
        res.render('generos');
    },
    
}

module.exports = renders;