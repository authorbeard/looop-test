var firstDay = new Date(2016, 10, 7)
var weekPrior = new Date(2016, 9, 31)


function generateData(dayObject){
  var intervals = [...Array(24)]
  intervals.map(function(e,i,arry){ 
    arry[i] = Math.floor(Math.random() * 50);
  })
  var day = [];
  var totAct = 0
  intervals.forEach(function(e,i, arry){
    totAct += e
    var increment = {
      "id": null, 
      "fw_count": e,
      "t": new Date(dayObject.getTime() + (i*300000)).toString(),
      "total_activity": totAct,
    } 
    day.push(increment);   
  })
  return day; 
};

module.exports=generateData


// var intervals = [...Array(24)]
// intervals.map(function(e,i,arry){ 
//   arry[i] = Math.floor(Math.random() * 50);
// })
// console.log(intervals)

// {
// "id": null,
// "fw_count": [How many people came in during the last 5 minutes],
// "t": [Timestamp]
// "total_activity": [Head count for the last 5 minutes]
// }
