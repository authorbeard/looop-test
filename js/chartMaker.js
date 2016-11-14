
function drawChart(dayArray){

  var raw = dayArray.reverse();
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

/////////////////////////////////////////////
//// MOUSEOVER EVENT --FIRST DATASET ONLY ///
////////////////////////////////////////////
      var mouseG = chart.append("g")
        .attr("class", "mouse-over-effects");

      // this is the vertical line
      mouseG.append("path")
        .attr("class", "mouse-line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", "0");

      // keep a reference to all our lines
      var lines = document.getElementsByClassName('line');

      // here's a g for each circle and text on the line
      var mousePerLine = mouseG.selectAll('.mouse-per-line')
        .data(data)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line");

      // the circle
      mousePerLine.append("circle")
        .attr("r", 7)
        .style("stroke", "black")
        .style("fill", "none")
        .style("stroke-width", "1px")
        .style("opacity", "0");

      // the text
      mousePerLine.append("text")
        .attr("transform", "translate(10,3)");

      // rect to capture mouse movements
      mouseG.append('svg:rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseout', function() { // on mouse out hide line, circles and text
          d3.select(".mouse-line")
            .style("opacity", "0");
          d3.selectAll(".mouse-per-line circle")
            .style("opacity", "0");
          d3.selectAll(".mouse-per-line text")
            .style("opacity", "0");
        })
        .on('mouseover', function() { // on mouse in show line, circles and text
          d3.select(".mouse-line")
            .style("opacity", "1");
          d3.selectAll(".mouse-per-line circle")
            .style("opacity", "1");
          d3.selectAll(".mouse-per-line text")
            .style("opacity", "1");
        })
        .on('mousemove', function() { // mouse moving over canvas
          var mouse = d3.mouse(this);

          // move the vertical line
          d3.select(".mouse-line")
            .attr("d", function() {
              var d = "M" + mouse[0] + "," + height;
              d += " " + mouse[0] + "," + 0;
              return d;
            });

      // position the circle and text
          d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
              console.log(width/mouse[0])
              var xDate = xScale.invert(mouse[0]),
                  bisect = d3.bisector(function(d) { return d.time; }).right;
                  idx = bisect(d.entrances, xDate);

              var beginning = 0,
                  end = lines[i].getTotalLength(),
                  target = null;

              while (true){
                target = Math.floor((beginning + end) / 2);
                pos = lines[i].getPointAtLength(target);
                if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                    break;
                }
                if (pos.x > mouse[0])      end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break; //position found
              }

              // update the text with y value
              d3.select(this).select('text')
                .text(yScale.invert(pos.y).toFixed(2));

              // return position
              return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
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



