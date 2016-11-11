
$(document).ready(function(){

  var chartData=fetchData();
  debugger;
  console.log(chartData)



})


function fetchData(){

  $.get('looop/', function(){
  }).done(function(data){
    parseData(data);
  })
  // return rawData;
}

function parseData(raw){
  debugger;
  var today = raw.fDay
  var lastWk = raw.pDay
  while(today.length > 0){
    var d = new Day();
    var inc=raw.slice(0,3);
    inc.forEach(function(e,i,inc){
debugger;
    })
  }
  debugger;
}

function drawChart(){

}