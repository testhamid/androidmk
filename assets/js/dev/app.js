var app = angular.module('myApp', ['ngRoute']).directive('myPostRepeatDirective', function() {
    return function(scope, element, attrs) {
        if (scope.$last) {
            scope.$eval('doComplete()');
        }
    };
});
angular.module('myApp').requires.push('ngSanitize');
app.config(function ($routeProvider, $locationProvider) {
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
    $scope.loading = true;
    $http.get("http://localhost:4444/api/apps", {cache: true}).then(function (response) {
        $scope.myData = response.data.results;
        $scope.loading = false;

    })
});

app.controller('appDetailCtrl', function ($scope, $http, $routeParams) {
    $scope.loading = true;
    $http.get("http://localhost:4444/api/apps/" + $routeParams.appId, {cache: true}).then(function (response) {
        $scope.myData = response.data;
        $scope.loading = false;
    });
    $scope.myText = "My name is: <h1>John Doe</h1>";

    /// ----Start---- Run an script after page load completed
    var module = angular.module('myApp', [])
        .directive('onFinishRender', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            scope.$emit(attr.onFinishRender);
                        });
                    }
                }
            }
        });
    $scope.doComplete = function() {
        LoadIForImage()
    }
    /// ----End---- Run an script after page load completed

    $scope.goDownload = function () {
        window.open('http://play.p30download.com/app/download/' + $scope.myData.appId, '_blank');
    };
});


function LoadIForImage() {
    jQuery(function ($) {
        var $overflow = '';
        var colorbox_params = {
            rel: 'colorbox',
            reposition: true,
            scalePhotos: true,
            scrolling: false,
            previous: '<i class="ace-icon fa fa-arrow-left"></i>',
            next: '<i class="ace-icon fa fa-arrow-right"></i>',
            close: '&times;',
            current: '{current} of {total}',
            maxWidth: '100%',
            maxHeight: '100%',
            onOpen: function () {
                $overflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            },
            onClosed: function () {
                document.body.style.overflow = $overflow;
            },
            onComplete: function () {
                $.colorbox.resize();
            },
            photo: true
        };

        $('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);
        $("#cboxLoadingGraphic").html("<i class='ace-icon fa fa-spinner orange fa-spin'></i>");//let's add a custom loading icon


        $(document).one('ajaxloadstart.page', function (e) {
            $('#colorbox, #cboxOverlay').remove();
        });
    })
}
