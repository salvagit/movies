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
        .when(myapp.basepath+'movie/:id', {
            templateUrl: "./pages/movie.html",
            resolve: myapp.galax("movie")
        })

        .otherwise({
            redirectTo: '404'
        });

});



myapp.searchMovies = function(params, cb){

    var id = params.id || "";
    myapp.$http({
        method: 'GET',
        url: myapp.endpoint+'/movies/'+id
    }).then(function successCallback(response) {
        cb(null, response.data);
    }, function errorCallback(response) {
        cb(response, null);
    });
}


myapp.controller("bodyCtrl", function ($scope, $http, $location) {

    $scope.location = $location;
    myapp.$http = $http;
    myapp.$scope = $scope;

});

myapp.controller("movie", function($scope, $http, $location){


    var id = $location.$$path.split("/")[2];

    myapp.searchMovies({id: id}, function(err, movie){
        if(err){
            alert("Error en el server");
        } else{
            $scope.movie = movie[0];
        }
    });

});


myapp.controller("home", function ($scope, $http) {
    console.log("mostrando la home");

    $scope.movie  = [];

    myapp.searchMovies({}, function(err, movies){
        if(err){
            alert("Error en el server");
        } else{
            $scope.movies = movies;
        }
    });


});
