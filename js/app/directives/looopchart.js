function looopChart(LooopController){

  return {

    controller: 'LooopController',
    controllerAs: 'ctrl',
    link: function($scope, $elem, $attrs, $ctrl){
      console.log('chart link function');
      debugger;
    },
    templateUrl: 'app/views/loopchart.html',

  }

}

angular
  .module('app')
  .directive('looopChart', looopChart)