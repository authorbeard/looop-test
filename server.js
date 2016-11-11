var express = require('express');
var app = express();
var request = require('request');
var faker = require('faker');

app.use(express.static(__dirname));



app.get('looop/', function (req, res) {
  debugger;
    return {
      firstDay.toString(): {
        generateData(firstDay);
      },
      weekPrior.toString(): {
        generateData(weekPrior),
      }
    }
  })
});

app.listen(8080);

console.log('Server started at http://localhost:8080');
