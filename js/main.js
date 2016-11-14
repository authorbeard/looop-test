$(document).ready(function(){
  
  fetchData();

})


function fetchData(){
  $.get('looop/', function(){
  }).done(function(resp){
    var x = parseData(resp.data);
    drawChart(x)
  })
}

