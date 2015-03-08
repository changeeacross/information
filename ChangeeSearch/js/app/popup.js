var host = 'http://localhost';

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
    $scope.message = "Hello from AngularJS";
    

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
        // var data = {
        //   title: info.title,
        //   description: info.description,
        //   image: info.image,
        //   link: $scope.link
        // }
        $scope.$apply();
    });


    $scope.submitInfo = function(info,tags){
        console.log(info);
        console.log(tags);
        var tagsArray = [];
        angular.forEach(info.keywords, function(data){
            tagsArray.push(data);
        });
        $scope.info.tags = tagsArray;

        $http({
            method: 'POST',
            url: host + '/info',
            data: $scope.info
        }).success(function(data, status, headers, config) {
            console.log(data + 'done');
            // loader.hide();
            history.back();
        }).error(function(argument) {
            console.log(argument);
        })  
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
            url : 'http://localhost/token/exchange',
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




