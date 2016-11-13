
function drawChart(dayArray){
  var data = dayArray;

    var chart = d3.select('.chart')
        margin = {top: 20, right: 20, bottom: 40, left: 50}
        height = 500 - margin.top - margin.bottom,
        width = 960 - margin.left - margin.right;
        g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // var increment = d3.timeParse("%H:%M")

    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return xScale(new Date(d.time)); })
      .y(function(d) { return yScale(d.entries); });
  //2. set x and y axis scales
  //will prob need to be updated when data's sorted
    debugger;
    var xScale = d3.scaleTime()
        .domain(d3.extent(data, function(d){return new Date(d.time)}))
        .rangeRound([0, width]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){return d.entries}))
        .rangeRound([height, 0]);

  //3. select chart container (it's already marked as svg in index.html)
    chart
        .attr("width", width)
        .attr("height", height)
        .attr("overflow", "visible");

    g.append("g")
        .attr("class", "axis x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
      .append("text")
        .text("Time");

    g.append("g")
        .attr("class", "axis y")
        .call(d3.axisLeft(yScale))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", (height/2)*-1)
        .style("text-anchor", "middle")
        .text("Entrances");

    g.append("path")
        .datum(data, function(d){return d.entrances})
        .attr("class", "line")
        .attr("d", line);

}


function timeElapsed(array){
  return (array[array.length-1].time - array[0].time )/60000;  
}