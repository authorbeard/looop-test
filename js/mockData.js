
function generateData(){
  return {
    "thisDay": generateDay(new Date(2016, 10, 7)),
    "lastWk": generateDay(new Date(2016, 9, 31))
  }
};


function generateDay(dayObject){
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
      "t": new Date(dayObject.getTime() + (i*300000)).getTime(),
      "total_activity": totAct,
    } 
    day.push(increment);   
  })
  return day; 
}


module.exports=generateData
