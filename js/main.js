

$(document).ready(function(){
// debugger;
  fetchData();


})


function fetchData(){
  // debugger;
  $.get('looop/', function(){
  }).done(function(resp){
    var x = parseData(resp.data);
    debugger;
    drawChart(x[0].data)
    debugger;
    // drawChart(parseData(resp.data));
  })

}

