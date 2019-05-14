/* global angular */
var app = angular.module("publicApp");

app.controller("ListCtrl3", ["$scope", "$http", function ($scope,$http){
                console.log("List Controller initialized");
                var API = "https://sos1819-07.herokuapp.com/api/v1/earnings-inter-stats";
                
                refresh();
                
                function refresh() {
                    console.log("Requesting earnings inter stats to <"+API+">...");
                    $http.get(API).then(function (response){
                        console.log("Data received: " + JSON.stringify(response.data,null,2));
                        $scope.earningsInterStats = response.data;
                    });
                }

                $scope.loadInitialData = function (){
                        $http.get(API + "/" + "loadInitialData").then(function (response){
                            alert("Base de datos inicializada.");
                            $scope.data = JSON.stringify(response.data,null,2);
                            $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        }).catch(function (response) {
			            	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			            });
			            refresh();
                };
                
                $scope.addEarningInterStat = function() {
                    var newEarningInterStat = $scope.newEarningInterStat;
                    console.log("Adding a new earning inter stat: " + JSON.stringify(newEarningInterStat,null,2)); 
                    $http.post(API,newEarningInterStat).then(function (response){
                        alert("La película " + JSON.stringify(newEarningInterStat.title,null,2) + " se ha creado correctamente.");
                        console.log("POST Response: " + response.status + " " + response.data);
                        refresh();
                    }, function (error){
                        if(error.status==400) {
                            alert("Error: Debe rellenar todos los campos.");
                        }
                        else if(error.status==409) {
                            alert("Error: La película " + JSON.stringify(newEarningInterStat.title,null,2) + " ya existe.");
                        }
                    });
                };

                $scope.deleteEarningInterStat = function(title) {
                    console.log("Deleting earning inter stat with title: " + title); 
                    $http.delete(API + "/" + title).then(function (response){
                        alert("La película se ha eliminado correctamente.");
                        console.log("DELETE Response: " + response.status + " " + response.data);
                        refresh();
                    });
                };
                
                $scope.deleteAll = function(){
                    console.log("Deleting all earnings inter stats");
                    $http.delete(API).then(function(response){
                        alert("Todas las películas se han eliminado correctamente.");
                        $scope.data = "";
                        console.log("DELETE ALL Response: " + response.status + " " + response.data);
                        refresh();
                    });
                };
                
                $scope.busqueda = function() {
                    console.log(API + "?" + $scope.atributo + "=" + $scope.valor);
                    $http.get(API + "?" + $scope.atributo + "=" + $scope.valor).then(function(response) {
                        if(response.data.length == 0) {
                           alert("No se ha encontrado ninguna película.");
                        }else if(response.data.length == 1){
                            alert("Se ha encontrado 1 película.");
                        }else{
                            alert("Se han encontrado " + response.data.length + " películas.");
                        }
                        $scope.earningsInterStats = response.data;
                        console.log("Búsqueda Response: " + response.status + " " + JSON.stringify(response.data,null,2));
                    });
                };
                
                $scope.paginacion = function() {
                    console.log(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset);
                    $http.get(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
                        alert("Paginación realizada correctamente.");
                        $scope.earningsInterStats = response.data;
                        console.log("Paginación Response: " + response.status + " " + JSON.stringify(response.data,null,2));
                    });
                };
                
                $scope.paginaAnterior = function() {
                    $scope.offset = $scope.offset - $scope.limit;
                    $http.get(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
                        $scope.earningsInterStats = response.data;
                    });
                };
        
                $scope.paginaSiguiente = function() {
                    $scope.offset = $scope.offset + $scope.limit;
                    $http.get(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
                        $scope.earningsInterStats = response.data;
                        $scope.error = "";
                    });
                };
                
                /*$scope.updateEarningInterStat = function(){
                    var newEarningInterStat = $scope.newEarningInterStat;
                    console.log("Updating earning inter stat: " + JSON.stringify(newEarningInterStat, null, 2));
                    $http.put($scope.url+"/"+newEarningInterStat.title, newEarningInterStat).then(function(response) {
                        alert("La película " + JSON.stringify(newEarningInterStat.title,null,2) + " se ha modificado correctamente.");
                        console.log("PUT Response: " + response.status + " " + response.statusText);
                        refresh();
                    }, function (error){
                        if(error.status==400) {
                            alert("Error: Debe rellenar todos los campos.");
                        }
                        else if(error.status==404) {
                            alert("Error: La película " + JSON.stringify(newEarningInterStat.title,null,2) + " no existe.");
                        }
                    });
                };*/
                
}]);