
function drawChart(dayArray){
  var raw = dayArray;
//Setting variables to be used throughout
    var fillParse=d3.timeFormat("%m%d%y")
    var opParse=d3.timeFormat("%U")

    var chart = d3.select('.chart')    
        .attr("width", width)
        .attr("height", height)
        .attr("overflow", "visible");

    var margin = {top: 20, right: 20, bottom: 40, left: 50},
        height = 500 - margin.top - margin.bottom,
        width = 960 - margin.left - margin.right;        

  raw.forEach(function (e, i, arry){
    var data=e.data;
    var g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    var xScale = d3.scaleTime()
      .domain(d3.extent(data, function(d){ return d.time }))
      .rangeRound([0, width]);

    var yScale = d3.scaleLinear()
      .domain(d3.extent(data, function(d){return d.entrances}))
      .rangeRound([height, 0]);
      
    data.forEach(function(d){
      d.time = new Date(d.time)
    })

//Only draw axes based on first day of data
    if (i==0){
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
    }

  //Complete lines and fill areas for each day
debugger;
    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return xScale(d.time); })
      .y(function(d) { return yScale(d.entrances); });



    var area = d3.area()
        .curve(d3.curveBasis)
        .x(function(d){ return xScale(d.time)})
        .y0(height)
        .y1(function(d){ return yScale(d.entrances) });

    g.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line);

    g.append("path")
        .data([data])
        .attr("class", "area")
        .attr("d", area)
        .attr("opacity", ".5")
        .attr("style", "fill: #" + fillParse(data[0].time));

  })
}
