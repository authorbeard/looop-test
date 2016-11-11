var express = require('express');
var app = express();
var mock = require('./js/app/mockData');

app.use(express.static(__dirname));

app.listen(8080);

app.get('/looop/', function (req, res) {
    var fDay = new Date(2016, 10, 7);
    var pDay = new Date(2016, 9, 31);
    res.json(
      {
        fDay: mock(fDay),
        pDay: mock(pDay)
      }
    )

});



console.log('Server started at http://localhost:8080');
