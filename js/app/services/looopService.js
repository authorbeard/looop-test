function LooopService($http){

  console.log('service entry');

  this.getData = function(){
  debugger;
    // return $http.get('looop/')
  }

}

angular
  .module('app')
  .service('LooopService', LooopService)