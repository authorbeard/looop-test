function parseData(raw){
  var days=[raw.thisDay, raw.lastWk]
  days.map(function(e,i,arr){
    var day = new Day(e[0].t.split(" ").slice(1,3).join(""))
      day["data"]={}
      while (e.length > 0){
        var increment = e.splice(0,3);
        var timestamp = setTime(increment[2]);
        var entries=calcEntry(increment);
        var headcount=increment[2].total_activity;
        day["data"][timestamp]={
          "entries": entries, 
          "headcount": headcount
        }

      }
      arr[i]=day;
    })
  return days; 
}

function setTime(obj){
  return new Date(obj.t).toTimeString();
}

function calcEntry(arr){
  return arr.map(function(e){
    return e.fw_count
  }).reduce(function(a,b){
    return a+b
  })
}