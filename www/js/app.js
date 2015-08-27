
var manifiestosApp = angular.module('manifiestosApp', []);

manifiestosApp.config(['$routeProvider',
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


manifiestosApp.controller('scannerController', function($scope) {
  $("#layout,#menu").removeClass("active");
  if(localStorage.getItem("MSG"))$("#resultado").html(localStorage.getItem("MSG")).show();
  $scope.getScan = function (type) { 
    scanear();
    $("#resultado").html(localStorage.getItem("MSG")).show();
    return false;
  }  
});

manifiestosApp.controller('placaController', function($scope) {
  $("#layout,#menu").removeClass("active");
  if(localStorage.getItem("MSG"))$("#resultado").html(localStorage.getItem("MSG")).show();
  $scope.setPhoto = function (type) { 
    photo();
    return false;
  }  
});

manifiestosApp.controller('impresionController', function($scope) {
  $("#layout,#menu").removeClass("active");
  if(localStorage.getItem("MSG"))$("#resultado").html(localStorage.getItem("MSG")).show();
});

