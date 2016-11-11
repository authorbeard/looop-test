
$(document).ready(function(){

  fetchData();

})


function fetchData(){
  debugger;
  $.get('looop/', function(){
  }).done(function(resp){
    
    drawChart(parseData(resp.data));
  })

}

function drawChart(dayArray){
  debugger;



}