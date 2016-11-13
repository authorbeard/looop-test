
function drawChart(dayArray){
  var data = dayArray;

  var maxEntry = d3.max(data, function(d){
    return d.entries;
  })

  var maxTime = d3.max(data, function(d){
    return d.time;
  })

  var maxHeadCt = d3.max(data, function(d){
    return d.headcount;
  })

  //1. set the properties of the chart
  //chosen based on landscape view of iPhone 6
    var margin = {top: 0, right: 0, bottom: 40, left: 40}
        height = 600,
        width = 600 - margin.top - margin.bottom;
  //2. set x and y axis scales
  //will prob need to be updated when data's sorted
    debugger;
    var xScale = d3.scaleLinear()
        .domain([0, maxTime])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, maxEntry])
        .range([height, 0]);
  //3. select chart container (it's already marked as svg in index.html)
    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("heigh", height);
  //4. set up data points
    /*
    -- set up data join
    -- set up formula for setting locations
    -- also define color, use transparency attr
       (so last wk is visible underneath)
    -- QUESTION: define line, colored area below line, here?
    */

  //5. package each entry object into a hover box
   /*
    -- current best guess: append an element (rect?)
       then set visibility to hidden, 
       then set an on-hover attribute
   */

   //6. define x axis
   // below is from the '13 tutorial. check for v4 chgs if hit bugs
    var xAxis = d3.axisBottom(xScale)
        .ticks(data[0].time, maxTime, data.length);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .text("Time");

    var yAxis = d3.axisLeft(yScale)
        .ticks(0, maxEntry, data.length);

    chart.append("g")
        .attr("class", "y axis")
        // .attr("transform", "translate(0,0)")
        .call(yAxis)
      .append("text")
        .text("Entrances");

}


//   var chart = d3.select(".chart")
//       .attr("width", width)
//       .attr("height", barHeight);

//   var bar = chart.selectAll("g")
//       .data(data)
//     .enter().append("g")
//       .attr("transform", function(d,i){ return "translate(0, " + (i*barHeight) + ")"});

//   bar.append("rect")
//       .attr("width", x)
//       .attr("height", barHeight);

//   bar.append("text")
//       .attr("x", function(d){ return x(d) - 3; })
//       .attr("y", barHeight/2)
//       .attr("dy", ".35em")
//       .text(function(d){ return d; });
// }