
function drawChart(dayArray){
//reversing so most recent data is drawn on top. 
  var raw = dayArray.reverse();
//Setting variables to be used throughout
    var formatTime = d3.timeFormat("%H:%M, %b %d")
        fillParse=d3.timeFormat("%m%d%y")
        opParse=d3.timeFormat("%U")
        bisectDate = d3.bisector(function(d) { return d.timestamp; }).left;

    var chart = d3.select('.chart')    
        .attr("width", width)
        .attr("height", height)
        .attr("overflow", "visible");

    var margin = {top: 50, right: 20, bottom: 40, left: 50},
        height = 500 - margin.top - margin.bottom,
        width = 960 - margin.left - margin.right;  

    var g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")      
    
    var fillSelector = {
          "0": "#cecfd0",
          "1": "#1224d8"
        }

  raw.forEach(function (e, i, arry){
    var data=e.data;
    
    var xScale = d3.scaleTime()
      .domain(d3.extent(data, function(d){ return d.timestamp }))
      .rangeRound([0, width]);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d){return d.entrances})])
      .rangeRound([height, 0]);

//begin drawing/filling lines for each day    

    data.forEach(function(d){
      d.timestamp = new Date(d.timestamp)
  debugger;
      if (d.entrances < 0) {
        return 0
      }
    })

    var line = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d) { return xScale(d.timestamp); })
      .y(function(d) { return yScale(d.entrances); });

    var area = d3.area()
        .curve(d3.curveCardinal)
        .x(function(d){ return xScale(d.timestamp)})
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
        .attr("transform", "translate(" + (width/2 + 100) + "," + i*30 + ")")
        .attr("dy",".8em")
        .text(e.name.toString());
    
    chart.append("rect")
        .attr("class", "data-label")
        .attr("transform", "translate(" + (width/2 + 75) + "," + i*30  + ")")
        .attr("dy", ".35em")
        .attr("style", "opacity: " + (i/3 + .3) + "; fill: " + fillSelector[i])
        .attr("width", 15)
        .attr("height", 15);

//// AXES AND MOUSEOVER ATTACHED ONLY TO MOST RECENT DATA //
    if (i==1){
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


/// HANDLING MOUSEOVER//
      var focus = g.append("g")
          .attr("class", "focus inc-details")
          .style("display", "none")

      focus.append("circle")
          .attr("r", 4.5)
          .style("stroke, blue");

      focus.append("rect")
          .attr("x", -50)
          .attr("height", 50)
          .attr("width", 100)

      focus.append("polyline")
          .attr("class", "pointer")

      focus.append("line")
          .attr("class", "pointer-bottom")
          
      focus.append("line")
          .classed('y', true);

      focus.append("text")
          .attr("class", "entrances")
          .attr("x", -47);

      focus.append("text")
          .attr("class", "headcount")
          .attr("x", 27);

      focus.append("text")
          .attr("class", "timestamp")
          .attr("x", -40);


      chart.append("rect")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("fill", "none")
          .attr("width", width)
          .attr("height", height)
          .style("pointer-events", "all")
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

      function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;

        var rectY = height-yScale(d.entrances) + 75

        focus.attr("transform", "translate(" + (xScale(d.timestamp)) + "," + (yScale(d.entrances)) + ")");
        focus.select("rect").attr("y", rectY);
        focus.select("polyline")
            .attr("points", "-20 " + " " + rectY + ", 0 " + (rectY-20) + "," + "20 " + rectY + "")
        focus.select("line.pointer-bottom")
            .attr("x1", -19)
            .attr("x2", 19)
            .attr("y1", rectY)
            .attr("y2", rectY)
            .attr("stroke", "white")
        focus.select("text.entrances")
            .attr("y", height - yScale(d.entrances) + 92)
            .text(d.entrances.toString());
        focus.select("text.headcount")
            .attr("y", height - yScale(d.entrances) + 92)
            .text(d.headcount.toString());
        focus.select("text.timestamp")
            .attr("y", height - yScale(d.entrances) + 122)
            .text(formatTime(d.timestamp));
        focus.select("line.y")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 5)
            .attr("y2", height - yScale(d.entrances)+55)
//// END OF MOUSEOVER ////   
        
      }
    } //<-- end of this-week-only 
  })
}

function make_x_gridlines(scale) {   
    return d3.axisBottom(scale)
        .ticks(5)
}



