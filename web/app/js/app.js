var host = "http://localhost"

myApp = angular.module('myApp', ['ui.router','ngTagsInput']);


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


myApp.controller('SubmitCtrl', ['$scope','$http','$timeout', function($scope, $http, $timeout){
  $scope.back = function() {
    history.back();
  }
  var timer;
  $scope.fetchLink = function(link) {
    var parseLink = link.split(".");
    if (parseLink.length < 2) {
      return;
    } else {
      if (timer) {
        $timeout.cancel(timer);
      }
      timer = $timeout(function() {
        $http({
          method: 'GET',
          url: host + '/link?url='+ link
        }).success(function(data, status, headers, config) {
          console.log(data);
          $scope.tags = [];
          angular.forEach(data.keywords, function(key) {
            this.push({
              text: key
            })
          }, $scope.tags)
          $scope.info = data;
          console.log($scope.tags);
        }).error(function(argument) {
          console.log(argument);
        })  
      }, 1000);  
    }
  }
  $scope.submitInfo = function(info, tags) {
    if ($scope.link.search('http') < 0) {
      $scope.link = 'http://' + $scope.link;
    }
    var data = {
      title: info.title,
      description: info.description,
      image: info.image,
      link: $scope.link
    }
    var tagArray = [];
    angular.forEach(tags, function(tag) {
      tagArray.push(tag.text); 
    });
    data.tags = tagArray;
    $http({
      method: 'POST',
      url: host + '/info',
      data: data
    }).success(function(data, status, headers, config) {
      console.log(data);
      history.back();
    }).error(function(argument) {
      console.log(argument);
    })  
  }
}])