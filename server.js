var express = require('express');
var app = express();
var mock = require('./js/mockData');
var sass = require('node-sass');


app.use(express.static(__dirname));

app.listen(8080);

app.get('/looop/', function (req, res) {
    res.json(
      {
        data: mock(),
      }
    )

});



console.log('Server started at http://localhost:8080');
