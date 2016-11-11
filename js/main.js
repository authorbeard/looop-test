
$(document).ready(function(){

  var chart=fetchData();
  debugger;
  console.log(chart)



})


function fetchData(){
  $.get('looop/', function(data){
    debugger;
  }).done(function(){
    debugger;
  })
  return rawData;
}

function parseData(raw){
  while(raw.length() > 0){
    var d = new Day();
    var inc=raw.slice(0,3);
    inc.forEach(function(e,i,inc){

    })
  }
  debugger;
}

function drawChart(){

}