var myapp = angular.module('myapp', ['ngRoute', 'ngAnimate']);

myapp.$http = null;

myapp.endpoint = "http://localhost:5000/service";
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
