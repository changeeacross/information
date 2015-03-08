var host = 'http://changeesearch.com';
// var host = 'http://localhost';

myApp.service('pageInfoService', function($rootScope) {
    this.getInfo = function(callback) {
        var model = {};

        chrome.tabs.query({'active': true},
        function (tabs) {
            if (tabs.length > 0){
                model.title = tabs[0].title;
                model.url = tabs[0].url;
                chrome.tabs.sendMessage(tabs[0].id, { 'action': 'PageInfo' }, function (response) {
                    model.pageInfos = response;
                    callback(model);
                });
            }

        });
        // chrome.bookmarks.getTree(function (tree){
        //     console.log(tree);
        // })

    };
});

myApp.controller("PageController",['$http','$scope','pageInfoService', function ($http, $scope, pageInfoService) {

    console.log('hello')
    // $scope.message = "Hello from AngularJS";
    

    pageInfoService.getInfo(function (info) {
        // $scope.title = info.title;
        $scope.url = info.url;
        // $scope.pageInfos = info.pageInfos;
        $http.get( host + '/link?url=' + info.url).success(function(data){
            $scope.info = data;
            $scope.title = data.title;
            // $scope.tags = data.keywords; 
            $scope.tags = [];
            angular.forEach(data.keywords, function(key) {
                this.push({
                    text: key
                })
            }, $scope.tags) 
            $scope.image = data.image;      
            $scope.info.url = data.url;
        })
        
        $scope.$apply();
    });


    $scope.submitInfo = function(info,tags){
        console.log(info);
        console.log(tags);
        var tagsArray = [];
        angular.forEach(info.keywords, function(data){
            tagsArray.push(data);
        });

        var data = {
          title: info.title,
          description: info.description,
          image: info.image,
          link: info.link
        }
        data.tags = tagsArray;

        $http({
            method: 'POST',
            url: host + '/info?token=' + $scope.serverToken,
            data: data
        }).success(function(data, status, headers, config) {
            console.log(data + 'done');
            // loader.hide();
            // history.back();
            window.close();
        }).error(function(argument) {
            $scope.message = 'Please try again.'
            console.log(argument);
        })  
    }

    $scope.myPocket = function(){
        $http.get(host + '/my/info?=' + $scope.serverToken).success(function(data){
            $scope.pocket = data ;
        }).error(console.log)
    }
    // Check Facebook Token //
    console.log(localStorage.accessToken)
    if (localStorage.accessToken) {
        $scope.fbLogin = false;
        $scope.accessToken = localStorage.accessToken;

        var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=displayUser";
        console.log(graphUrl);

        var loginData = {
            "provider" : "facebook",
            "token" : localStorage.accessToken
        };
        console.log(loginData);


        $http({
            method : 'POST',
            url : host + '/token/exchange',
            data : loginData
        }).success(function(data){
            $scope.serverToken = data;
            var script = document.createElement("script");
            script.src = graphUrl;
            document.body.appendChild(script);
            function displayUser(user) {
                console.log(user);
            }

        }).error(console.log)

        
    } else {
        $scope.fbLogin = true;
    }


}]);




