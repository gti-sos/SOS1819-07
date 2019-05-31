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
            })
            .when("/ui/v1/subsidies-stats", {
                controller: "ListCtrl",
                templateUrl: "./ui/v1/subsidies-stats/list.html"
            })
            .when("/ui/v1/takingstats", {
                controller: "ListCtrl2",
                templateUrl: "./ui/v1/takingstats/listTaking.html" 
            })
            .when("/edita/:film", {
                controller: "EditCtrl2",
                templateUrl: "./ui/v1/takingstats/editTaking.html"
            })
            .when("/ui/v1/earnings-inter-stats",{
               controller: "ListCtrl3",
               templateUrl:"./ui/v1/earnings-inter-stats/listEarningsInterStats.html"   
            })
            .when("/editaa/:title",{
                controller:"EditCtrl3",
                templateUrl:"./ui/v1/earnings-inter-stats/editEarningsInterStats.html"
            })
            
            .when("/ui/v1/earnings-inter-stats/analyticsEIS",{
               controller : "AnalyticsCtrlEIS",
               templateUrl: "./ui/v1/earnings-inter-stats/analyticsEarningsInterStats.html"   
            })
            .when("/ui/v1/earnings-inter-stats/integrationsEIS",{
               controller : "IntegrationCtrlEIS",
               templateUrl: "./ui/v1/earnings-inter-stats/integrationsEarningsInterStats.html"   
            })
            .when("/analytics",{
               controller : "IntegrationGrupalCtrl",
               templateUrl: "./ui/v1/integrations-grupal.html"   
            })
            .when("/graphic-takings",{ //dioni
                controller:"GraficaCtrl",
                templateUrl:"./ui/v1/takingstats/grafica.html"
            })
            .when("/ui/v1/takingstats/uses",{ //dioni
                controller:"UsesCtrl",
                templateUrl:"./ui/v1/takingstats/uses.html"
            })
            .when("/ui/v1/takingstats/external-integrations",{ //dioni
                controller:"ExternalIntegrationsCtrl",
                templateUrl:"./ui/v1/takingstats/externalIntegrations.html"
            })
            .when("/integrations",{
                controller:"IntegrationsCtrl",
                templateUrl:"./ui/v1/integrations.html"
            })
            .when("/about",{
                controller:"AboutCtrl",
                templateUrl:"./ui/v1/about.html"
            });
       
            
    });

console.log("App Initialized.");
