function LooopChart(){
console.log('chart entry');
  return {

    controller: LooopController,
    controllerAs: 'ctrl',

  }

}

angular
  .module('app')
  .directive('looopChart', looopChart)