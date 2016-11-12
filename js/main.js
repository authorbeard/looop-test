

$(document).ready(function(){

  fetchData();
  helloChart();
  svgTest();


})


function fetchData(){
  debugger;
  $.get('looop/', function(){
  }).done(function(resp){
    
    // drawChart(parseData(resp.data));
  })

}

