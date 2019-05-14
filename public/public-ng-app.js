/* global angular */

angular
    .module("publicApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/main.html"
            })
            .when("/edit/:film", {
                controller: "EditCtrl",
                templateUrl: "./ui/v1/subsidies-stats/edit.html"
            }).when("/ui/v1/subsidies-stats", {
                controller: "ListCtrl",
                templateUrl: "./ui/v1/subsidies-stats/list.html"
            })
            .when("/ui/v1/takingstats", {
                controller: "ListCtrl2",
                templateUrl: "./ui/v1/takingstats/listTaking.html" //cargar esta vista(templateUrl) con este controlador
            })
            .when("/edita/:film", {
                controller: "EditCtrl2",
                templateUrl: "./ui/v1/takingstats/editTaking.html"
            });
    });

    angular
        .module("publicApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   templateUrl: "/main.html"
                })
                .when("/edit/:film",{
                   controller : "EditCtrl",
                   templateUrl: "./ui/v1/subsidies-stats/edit.html"
                }).when("/ui/v1/subsidies-stats",{
                   controller : "ListCtrl",
                   templateUrl: "./ui/v1/subsidies-stats/list.html"
                });
        });

console.log("subsidies-stats App Initialized.");
