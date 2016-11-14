

$(document).ready(function(){
// debugger;
  fetchData();


})


function fetchData(){
  $.get('looop/', function(){
  }).done(function(resp){
    var x = parseData(resp.data);
    drawChart(x)
    // drawChart(x[0].data)
    // debugger;
    // drawChart(parseData(resp.data));
  })

}

