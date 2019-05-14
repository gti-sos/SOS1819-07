/*global angular*/

angular
    .module("App",["ngRoute"])
    .config(function($routeProvider){ 
        $routeProvider
            .when("/",{
               templateUrl:"main.html"  
            })
            .when("/takingstats",{
               controller: "ListCtrl",
               templateUrl:"listTaking.html"   //cargar esta vista(templateUrl) con este controlador
            })
            .when("/edit/:film",{
                controller:"EditCtrl",
                templateUrl:"editTaking.html"
            })
            .when("/earningsInterStats",{ //zoilo
                   controller : "ListCtrl2",
                   templateUrl: "listEarningsInterStats.html"
                })
            .when("/edita/:title",{ //zoilo
                   controller : "EditCtrl2",
                   templateUrl: "editEarningsInterStats.html"
                });
    });

console.log("TakingsApp initialized.");