function LooopController(LooopService){

  console.log("controller entry");
  var ctrl = this;

  ctrl.rawData = [];
  ctrl.headcounts = [];
  ctrl.entrances = [];

  LooopService
    .getData()
    .then(function(res) {
      ctrl.rawData = res;
    })

  function prepChartData(rawArray){
    while(rawArray.length() > 0 ){
      var d = new Day();
      var inc = rawArray.slice(0,3);
      inc.forEach(function(e, i, inc){

      })
        // 1. new increment object
        // 2. new increment.entrances = select each.fw_count, sum
        // 3. increment.headcount = select/sum each.total_activity
        // 4. increment.time = inc.last.t 
        // 5. add increment to chart data array 

    }
  }  




}

angular 
  .module('app')
  .controller('LooopController', LooopController);