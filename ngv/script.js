var testApp = angular.module('testApp', ['ngRoute']);

testApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'testController'
        })
        .when('/category/:name', {
            templateUrl : 'views/category.html',
            controller  : 'CategoryController'
        })
        .when('/item/:name', {
            templateUrl : 'views/single.html',
            controller  : 'ShopController'
        });
});

testApp.controller('testController' , function ($scope) {
    
    $scope.myNumber = 1;
    
    $scope.go = function() {
        $scope.myNumber = $scope.myNumber + 1;
        console.log("hit");
    };
    
});

testApp.controller('CategoryController', function ($scope, $routeParams) {
    
    $scope.categoryName = $routeParams.name;
    
    $scope.items = [
        { name : "iPhone", cost : "12.99" },
        { name : "iPad", cost : "14.99" }
    ];
    
});

testApp.controller('ShopController', function ($scope, $routeParams) {
    
    $scope.itemName = $routeParams.name;

});
