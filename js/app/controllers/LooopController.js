function LooopController(looopService){

  var ctrl = this;

  ctrl.rawData = [];
  ctrl.headcounts = [];
  ctrl.entrances = [];

  looopService
    .getData()
    .then(function(res) {
      ctrl.rawData = res;
    })


}

angular 
  .module('app')
  .controller('LooopController', LooopController);