const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dhchallenge'
});

module.exports = {
    findAll: function (req, res) {
        //select * from canciones order by genero_id
        //con.query('SELECT * FROM canciones ORDER BY genero_id', function (err, result, fields) {
        //    if (err) throw err;
        //    res.send(result);
        //});

        con.query('SELECT * FROM canciones INNER JOIN generos ON canciones.genero_id = generos.id ORDER BY generos.id', function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    },
    createGenero: function (req, res) {
        idGenero = req.body.idGenero;
        nombreGenero = req.body.nombreGenero;

        //insert into generos values (idGenero, nombreGenero)
        con.query('INSERT INTO generos VALUES (?, ?)', [idGenero, nombreGenero], function (err, result, fields) {
            if (err) throw err;
            res.send({ result });
        }
        );
    }
}