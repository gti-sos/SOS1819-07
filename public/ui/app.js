/*global angular*/

angular
    .module("EarningApp",["ngRoute"])
    .config(function($routeProvider){ 
        $routeProvider
            .when("/",{
               controller: "ListCtrl2",
               templateUrl:"listEarningsInterStats.html"   //cargar esta vista(templateUrl) con este controlador
            })
            .when("/edit/:title",{
                controller:"EditCtrl2",
                templateUrl:"editEarningsInterStats.html"
            });
    });

console.log("TakingsApp initialized.");