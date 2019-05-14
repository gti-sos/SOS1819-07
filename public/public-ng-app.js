/* global angular */
    angular
        .module("publicApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   templateUrl: "/main.html"
                })
                .when("/edit/:title",{
                   controller : "EditCtrl",
                   templateUrl: "./ui/v1/subsidies-stats/edit.html"
                }).when("/ui/v1/subsidies-stats",{
                   controller : "ListCtrl",
                   templateUrl: "./ui/v1/subsidies-stats/list.html"
                });
        });

    console.log("subsidies-stats App Initialized.");