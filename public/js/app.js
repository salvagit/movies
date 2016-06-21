var myapp = angular.module('myapp', ['ngRoute', 'ngAnimate']);

myapp.$http = null;

myapp.endpoint = "http://localhost/service";


myapp.basepath = "/";

myapp.galax = function (title) {
    return {
        other: ["$location", function ($location) {
        }]
        , delay: function ($q, $timeout) {
            var _this = this;
            var delay = $q.defer();


            $("#loading").show();
            $(document.body).css("opacity", "0.5");

            $timeout(function () {
                delay.resolve();
                $("#loading").hide();
                $(document.body).css("opacity", "1");

            }, 250);
            return delay.promise;

        }
    };
};


myapp.constant('_START_REQUEST_', '_START_REQUEST_');
myapp.constant('_END_REQUEST_', '_END_REQUEST_');


myapp.config(function ($routeProvider, $locationProvider) {

    $("#loading").hide();

    $routeProvider

        .when("/", {
            templateUrl: './pages/home.html',
            controller: 'bodyCtrl',
            resolve: myapp.galax("home")
        })

        .when(myapp.basepath + '404', {
            templateUrl: function () {
                return "./pages/404.html";
            }
            , resolve: myapp.galax("Error 404, invalid page.")
        })

        .otherwise({
            redirectTo: '404'
        });

});


myapp.controller("bodyCtrl", function ($scope, $http, $location) {

    $scope.location = $location;
    myapp.$http = $http;
    myapp.$scope = $scope;

});

myapp.controller("home", function ($scope, $filter) {
    console.log("mostrando la home");
});
