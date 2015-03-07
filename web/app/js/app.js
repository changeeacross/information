myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html"
    }).state('home.submit', {
      url: "submit",
      templateUrl: "partials/submit.html",
      controller: "SubmitCtrl"
    });
});


myApp.controller('SubmitCtrl', ['$scope', function($scope){
  $scope.back = function() {
    history.back();
  }
}])