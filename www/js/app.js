
var sampleApp = angular.module('manifiestosApp', []);

sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Scanner', {
  templateUrl: 'views/scanner.html',
  controller: 'scannerController'
      }).
      when('/Placa', {
  templateUrl: 'views/placa.html',
  controller: 'placaController'
      }).
      when('/Impresion', {
  templateUrl: 'views/impresion.html',
  controller: 'impresionController'
      }).      
      otherwise({
  templateUrl: 'views/intro.html'
      });
}]);


sampleApp.controller('scannerController', function($scope) {  
    $scope.getScan = function (type) { 
      scanear();
      return false;
    }  
});

sampleApp.controller('placaController', function($scope) {

  $scope.message = 'This is Show orders screen';

});

sampleApp.controller('impresionController', function($scope) {

  $scope.message = 'This is Show orders screen';

});
