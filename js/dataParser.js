function parseData(raw){
  var days=[raw.thisDay, raw.lastWk]

  days.map(function(e,i,arr){
    var day = new Day(extractDate(e[0]))
      day["data"]=[]
      while (e.length > 0){
        var increment = e.splice(0,3);
        var timestamp = increment[2].t;
        var entrances=calcEntrances(increment);
        var headcount=increment[2].total_activity;
        day["data"].push(
          {"timestamp": timestamp,
          "entrances": entrances,
          "headcount": headcount
          }
        )

      }
      arr[i]=day;
    })
  return days; 
}

function extractDate(num){
  return new Date(num.t).toDateString();  
}

function calcEntrances(arr){
  return arr.map(function(e){
    return e.fw_count
  }).reduce(function(a,b){
    return a+b
  })
}