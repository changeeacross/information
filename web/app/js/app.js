var host = "";

myApp = angular.module('myApp', ['ui.router','ngTagsInput','ngStorage']);


myApp.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
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

var ref = new Firebase("https://changeesearch.firebaseio.com");


myApp.controller('AuthCtrl', ['$scope','$rootScope','$http','$timeout', function($scope, $rootScope, $http, $timeout){
  console.log('auth...');
  $scope.logout = function() {
    console.log('unauth');
    localStorage.setItem('expire', "");
    localStorage.setItem('accessToken', "");
    localStorage.setItem('uid', "");
    localStorage.setItem('name', "");  
    localStorage.setItem('session', "");
    ref.unauth();
    $scope.checkLoginStatus();
  }
  $scope.loginWithFB = function() {
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        // console.log("Login Failed!", error);
        alert('登入失敗...');
      } else {
        console.log(authData); 
        localStorage.setItem('expire', authData.expires);
        localStorage.setItem('accessToken', authData.facebook.accessToken);
        localStorage.setItem('uid', authData.facebook.id);
        localStorage.setItem('name', authData.facebook.displayName);  
        // console.log($cookieStore.get('expire'));
        $scope.checkLoginStatus();
        $scope.$apply();
      }
    }, {
      scope: "email, public_profile, user_friends"
    });
  }
  $scope.checkLoginStatus = function() {
    var currentTime = Math.floor(new Date().getTime()/1000);
    var expire = localStorage.getItem('expire');
    // console.log(localStorage.getItem('accessToken'));
    // console.log(expire);
    if (!expire) {
      $scope.loginStatus = false;
    } else if (expire < currentTime) {
      $scope.loginStatus = false;
    } else {
      $scope.loginStatus = true;
      $rootScope.accessToken = localStorage.getItem('accessToken');
      $rootScope.displayName = localStorage.getItem('name');
      $scope.fbId = localStorage.getItem('uid');
      $http({
        method: 'POST',
        url: host + '/token/exchange',
        data: {
          "provider": "facebook",
          "token": $rootScope.accessToken,
        }
      }).success(function(data, status, headers, config) {
        // console.log(data);
        localStorage.setItem('session', data);
        $rootScope.session = data;
      }).error(function(argument) {
        console.log(argument);
      })
    }
  }
  $timeout(function() {
    $scope.checkLoginStatus();
  }, 0)
}])


myApp.controller('SubmitCtrl', ['$scope','$rootScope','$http','$timeout', function($scope, $rootScope, $http, $timeout){
  var loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 300, easingIn : mina.easeinout } );
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
        loader.show();
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
          loader.hide();
          console.log($scope.tags);
        }).error(function(argument) {
          console.log(argument);
        })  
      }, 0);  
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
    loader.show();
    $http({
      method: 'POST',
      url: host + '/info?token=' + $rootScope.session,
      data: data
    }).success(function(data, status, headers, config) {
      console.log(data);
      loader.hide();
      history.back();
    }).error(function(argument) {
      console.log(argument);
    })  
  }
}])