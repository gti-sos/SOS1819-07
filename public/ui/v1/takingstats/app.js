/*global angular*/

angular
    .module("App",["ngRoute"])
    .config(function($routeProvider){ 
        $routeProvider
            .when("/",{
               controller: "ListCtrl",
               templateUrl:"listTaking.html"   //cargar esta vista(templateUrl) con este controlador
            })
            .when("/edit/:film",{
                controller:"EditCtrl",
                templateUrl:"editTaking.html"
            });
    });

console.log("TakingsApp initialized.");