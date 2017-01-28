var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: 'views/app-home.html',
            controller: 'customersCtrl'
        })
        .when('/appDetail/:appId', {
            templateUrl: 'views/app-detail.html',
            controller: 'appDetailCtrl'
        }).otherwise({redirectTo: '/'});

});

app.controller('customersCtrl', function ($scope, $http) {
    $http.get("http://localhost:4444/api/apps").then(function (response) {
        $scope.myData = response.data.results;
    })
});

app.controller('appDetailCtrl', function ($scope, $http, $routeParams) {

    $http.get("http://localhost:4444/api/apps/" +$routeParams.appId).then(function (response) {
        $scope.myData = response.data;
    })
});
