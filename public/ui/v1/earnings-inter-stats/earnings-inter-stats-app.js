/* global angular */
    angular
        .module("EarningsInterStatsApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   controller : "ListCtrl",
                   templateUrl: "list.html"
                })
                .when("/edit/:title",{
                   controller : "EditCtrl",
                   templateUrl: "edit.html"
                });
        });

    console.log("Earnings Inter Stats App Initialized.");

