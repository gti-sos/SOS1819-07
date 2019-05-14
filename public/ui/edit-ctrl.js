/* global angular */

    angular.module("TakingsApp").controller("EditCtrl2",["$scope","$http", "$routeParams","$location", function ($scope,$http,$routeParams,$location){
            console.log("Edit Controller initialized.");
            var API = "https://sos1819-07.herokuapp.com/api/v1/earnings-inter-stats";

            var title = $routeParams.title;
            
            console.log("Requesting earning inter stat <"+API+"/"+title+">...");
            
            $http.get(API+"/"+title).then(function (response){
                console.log("Data Received: " + JSON.stringify(response.data,null,2));
                $scope.updatedEarningInterStat = response.data;
            });
            
            $scope.updateEarningInterStat = function (title){
                console.log("Updating earning inter stat with title: " + title);
                $http.put(API+"/"+title,$scope.updatedEarningInterStat).then(function (response){
                        console.log("PUT Response: " + response.status + " " + response.data);
                        $location.path("/");
                });
            };
    }]);    