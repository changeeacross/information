var host = "http://localhost"

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


myApp.controller('SubmitCtrl', ['$scope','$http', function($scope, $http){
  $scope.back = function() {
    history.back();
  }
  $scope.fetchLink = function(link) {
    console.log(link);
    $http({
      method: 'GET',
      url: host + '/link?url='+ link
    }).success(function(data, status, headers, config) {
      console.log(data);
    }).error(function(argument) {
      alert(argument);
    })
  }
}])