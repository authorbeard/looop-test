
function drawChart(dayArray){

  var raw = dayArray.reverse();
//Setting variables to be used throughout
    var fillParse=d3.timeFormat("%m%d%y")
        opParse=d3.timeFormat("%U")
        isectDate = d3.bisector(function(d) { return d.time; }).left;

    var chart = d3.select('.chart')    
        .attr("width", width)
        .attr("height", height)
        .attr("overflow", "visible");

    var margin = {top: 20, right: 20, bottom: 40, left: 50},
        height = 500 - margin.top - margin.bottom,
        width = 960 - margin.left - margin.right;        
    
    var fillSelector = {
          "0": "#cecfd0",
          "1": "#1224d8"
        }

  raw.forEach(function (e, i, arry){
    var data=e.data;
    var g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    var xScale = d3.scaleTime()
      .domain(d3.extent(data, function(d){ return d.time }))
      .rangeRound([0, width]);

    var yScale = d3.scaleLinear()
      .domain(d3.extent(data, function(d){return d.entrances}))
      .rangeRound([height, 0]);

//begin drawing/filling lines for each day    

    data.forEach(function(d){
      d.time = new Date(d.time)
    })

    if (i==0){
      g.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(xScale))
        .append("text")
          .attr("transform", "translate(" + width/2 + ", 50)")
          .attr("style", "font-size: 18")
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
          .attr("style", "font-size: 18")
          .text("Entrances");

      var focus = chart.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("circle")
          .attr("r", 4.5);

      focus.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");

      g.append("rect")
          .attr("class", "overlay")
          .attr("fill", "none")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

      function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.time > d1.time - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.time) + "," + y(d.close) + ")");
        focus.select("text").text(d.entrances);
      }
    }

  //set up lines and fill areas for each day
    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return xScale(d.time); })
      .y(function(d) { return yScale(d.entrances); });

    var area = d3.area()
        .curve(d3.curveBasis)
        .x(function(d){ return xScale(d.time)})
        .y0(height)
        .y1(function(d){ return yScale(d.entrances) });

    var x_gridlines = make_x_gridlines(xScale);
    g.append("g")     
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(x_gridlines
          .tickSize(-height)
          .tickFormat("")
      )

// adding lines & areas
    g.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line);

    g.append("path")
        .data([data])
        .attr("class", "area")
        .attr("d", area)
        .attr("style", "opacity: " + (i/3 + .3) + "; fill: " + fillSelector[i]);

//adding data labels
    chart.append("text")
        .attr("class", "data-label")
        .attr("transform", "translate(" + (width/2 + 100) + "," + (i*margin.top +20) + ")")
        .attr("dy",".8em")
        .text(e.name.toString());
    
    chart.append("rect")
        .attr("class", "data-label")
        .attr("transform", "translate(" + (width/2 + 75) + "," + (i*margin.top +20) + ")")
        .attr("dy", ".35em")
        .attr("style", "opacity: " + (i/3 + .3) + "; fill: " + fillSelector[i])
        .attr("width", 15)
        .attr("height", 15);
    })
}

function make_x_gridlines(scale) {   
    return d3.axisBottom(scale)
        .ticks(5)
}



