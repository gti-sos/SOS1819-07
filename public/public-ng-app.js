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
            })
            .when("/ui/v1/earnings-inter-stats",{
               controller: "ListCtrl3",
               templateUrl:"./ui/v1/earnings-inter-stats/listEarningsInterStats.html"   //cargar esta vista(templateUrl) con este controlador
            })
            .when("/editaa/:title",{
                controller:"EditCtrl3",
                templateUrl:"./ui/v1/earnings-inter-stats/editEarningsInterStats.html"
            })
            .when("/graphic-takings",{
                controller:"GraficaCtrl",
                templateUrl:"./ui/v1/takingstats/grafica.html"
            });
    });


console.log("subsidies-stats App Initialized.");
