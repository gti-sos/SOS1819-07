/* global angular */

var app = angular.module("postmanuel");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                
                
                
                    console.log("Modular MainCtrl initialized!");
                    
                    $scope.url = "https://sos1819-07.herokuapp.com/api/v1/subsidies-stats/";
                    $scope.name ="LaLlamada";
                    $scope.data = '';
                    $scope.statusInfo = '';
                
                    
                    $scope.reset = function() {
                    $scope.data = '';
                    $scope.statusInfo = '';
                    };
                    
                    //get all
                    $scope.getAll = function (){
                        
                        $http.get($scope.url).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        
                    });
                        
                    };
                    
                    //loadInitialData
                    $scope.lid = function (){
                        
                        try{
                        $http.get($scope.url + "loadInitialData").then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        }catch(e){
                        
                        alert(e);
                    }
                    };
                    
                    //get 
                    $scope.get = function (){
                        
                        if($scope.name == ''){
                            
                            $scope.data = "the field 'Film' is empty!!!!!!!!";
                            $scope.statusInfo = '';
                            
                        }else{
                        
                        $http.get($scope.url + $scope.name).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
                        $scope.data = '';
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        }
                    };
                    
                    //delete all
                    $scope.deleteAll = function (){
                        
                        $http.delete($scope.url).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        
                    };
                    
                    //delete 
                    $scope.delete = function (){
                        
                        if($scope.name == ''){
                            
                            $scope.data = "the field 'Film' is empty!!!!!!!!";
                            $scope.statusInfo = '';
                            
                        }else{
                        
                        $http.delete($scope.url + $scope.name).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                    
                            
                        }).catch(function (response) {
                            
                            $scope.data = '';
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        }   
                    };
                    
                    //post
                    $scope.post = function (){
                       try{ 
                        
                        var data = JSON.parse($scope.data);
                        
                        
                        $http.post($scope.url + $scope.name, data).then(function (response){
                        
                        //$scope.data = 
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        //	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        
                       }catch(e){
                        
                        $scope.statusInfo = '';
                        $scope.data = "there is nothing here to post...";
                    }
                        
                    };
                    
                    
                    //put
                    $scope.put = function (){
                        
                       try{ 
                        var data = JSON.parse($scope.data);
                        
                        
                        $http.put($scope.url + $scope.name, data).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        	
			        });
                       }catch(e){
                        
                        $scope.statusInfo = '';
                        $scope.data = "there is nothing here to put...";
                    }
                    };
                    
                
            }] );