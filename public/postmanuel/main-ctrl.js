/* global angular */

var app = angular.module("postmanuel");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                    console.log("Modular MainCtrl initialized!");
                    
                    $scope.url = "https://sos1819-07.herokuapp.com/api/v1/subsidies-stats/";
                    
                    //get all
                    $scope.getAll = function (){
                        
                        $http.get($scope.url).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        
                    });
                        
                    };
                    
                    //loadInitialData
                    $scope.lid = function (){
                        
                        $http.get($scope.url + "loadInitialData").then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        });
                        
                    };
                    
                    //get 
                    $scope.get = function (){
                        
                        $http.get($scope.url + $scope.name).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        });
                        
                    };
                    
                    //delete all
                    $scope.deleteAll = function (){
                        
                        $http.delete($scope.url).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.data, null, 2);
                        
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        });
                        
                    };
                    
                    //delete 
                    $scope.delete = function (){
                        
                        $http.delete($scope.url + $scope.name).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        });
                        
                    };
                    
                    //post
                    $scope.post = function (){
                       try{ 
                        
                        var data = JSON.parse($scope.data);
                        
                        
                        $http.post($scope.url + $scope.name, data).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        });
                        
                       }catch(e){
                        
                        alert(e);
                    }
                        
                    };
                    
                    
                    //put
                    $scope.put = function (){
                        
                        
                        var data = JSON.parse($scope.data);
                        
                        
                        $http.put($scope.url + $scope.name, data).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        });
                        
                    };
                    
                
            }] );