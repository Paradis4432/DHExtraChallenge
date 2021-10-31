
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');



function select(){
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM generos", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          jsonString = JSON.stringify(result, null, 2);

          fs.writeFile('songs.json', jsonString, function(err) {
              if (err) throw err;
              console.log('Saved!');
          });
        });
      });
}

function insert(){
    
}

select();