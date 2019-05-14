/* global angular */

angular.module("publicApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function ($scope, $http, $routeParams, $location){
                
                
                
                
                    console.log("Modular ListCtrl initialized!");
                    var API = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats";
                    var offset = 0;
                    console.log("Requesting films to <"+API+">...");
                    
                    refresh();
                    
                    function refresh(){
                       
                    $http.get(API+"?limit=10&offset="+offset).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                    }
                    var film = $routeParams.film;
                    
                    $http.get(API+"/"+film).then(function (response){
                        
                        $scope.film = response.data;
                        
                    });
                    
                    $scope.url = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats/";
                    $scope.name ="LaLlamada";
                    $scope.data = '';
                    $scope.statusInfo = '';
                
                    
                    $scope.reset = function() {
                    $scope.data = '';
                    $scope.statusInfo = '';
                    };
                    
                    
                    $scope.next = function(){
                        
                        if($scope.films.length == 10){
                        offset += 10;
                        }
                        $http.get(API+"?limit=10&offset="+offset).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                        
                    };
                    
                    $scope.previous = function(){
                        
                        if(!(offset < 10)){
                        offset -= 10;
                        }
                        
                        $http.get(API+"?limit=10&offset="+offset).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                        
                    };
                    
                   
                   
                   
                    
                    //put
                    $scope.updateFilm = function (film){
                        
                       try{ 
                        
                        $http.put(API + "/"+film, $scope.film).then(function (response){
                            alert("Película modificada con exito");
                        $location.path("/");
                        console.log(JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2));
                        
                    }).catch(function (response) {
                        
                        if(response.status == 404){
                            
                            alert("La película que intenta modificar no existe");
                            
                        }
                        
                        
                        if(response.status == 400){
                            
                            alert("Para modificar una película rellene todo los campos");
                            
                        }
                        
                        
			        	console.log(JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2));
			        	
			        });
                       }catch(e){
                        
                        $scope.statusInfo = '';
                        $scope.data = "there is nothing here to put...";
                    }
                    };
                    
                   
                    
                    
                    
                    
                  
            }] );