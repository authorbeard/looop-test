var express = require('express');
var app = express();
var request = require('request');

app.use(express.static(__dirname));

app.listen(8080);

app.get('looop/', function (req, res) {
  request('http://sensor-checkin-service.api.looop.in/test-dashboard-activity', function (error, response, body) {
    res.json(JSON.parse(body));
  })
});


console.log('Server started at http://localhost:8080');
