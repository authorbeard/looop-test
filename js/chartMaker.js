

function helloChart(){
  var w=960, h=50,
  svg=d3.select(".chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var text=svg
    .append("text")
    .text("hello world")
    .attr("y", 50);
  }


function drawChart(dayArray){
  // debugger;

  // var data = [4,8,15,16,23,42]
  // d3.select(".chart")
  //   .selectAll("div")
  //     .data(data)
  // .enter().append("div")
  //   .style("width", function(d) { return d * 10 + "px"; })
  //   .text(function(d) { return d; });


}

function svgTest(){
  var data = [4,8,15,16,23,42]
  var width = 420,
        barHeight = 20;
debugger;
  var x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, width]);

  var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", barHeight);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d,i){ return "translate(0, " + i*barHeight + ")"});

  bar.append("rect")
      .attr("width", x)
      .attr("height", barHeight);

  bar.append("text")
      .attr("x", function(d){ return x(d) -3 })
      .attr("y", barHeight/2)
      .attr("dy", ".35em")
      .text(function(d){ return d; });
}