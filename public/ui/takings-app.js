/*global angular*/

angular
    .module("TakingsApp",["ngRoute"])
    .config(function($routeProvider){ 
        $routeProvider
            .when("/takingstats",{
               controller: "ListCtrl",
               templateUrl:"listTaking.html"   //cargar esta vista(templateUrl) con este controlador
            })
            .when("/edit/:film",{
                controller:"EditCtrl",
                templateUrl:"editTaking.html"
            })
            .when("/earning",{ //zoilo
                   controller : "ListCtrl2",
                   templateUrl: "list.html"
                })
            .when("/edita/:title",{ //zoilo
                   controller : "EditCtrl2",
                   templateUrl: "edit.html"
                });
    });

console.log("TakingsApp initialized.");