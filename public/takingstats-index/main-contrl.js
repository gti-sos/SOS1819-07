  var app = angular.module("MiniPostmanApp");

  app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
      console.log("MainCtrl initicialized!");
      $scope.url = "https://sos1819-07.herokuapp.com/api/v1/takingStats";

      //get
      
      $scope.send = function() {
          $http.get($scope.url).then(function(response) {
              $scope.data = JSON.stringify(response.data, null, 2);
              $scope.estado=response.status;
          }).catch(function (response) { //recoje el error en caso de que haya
			        $scope.estado = response.status;
			        });;
      };
  

      //post
      $scope.country = null;
      $scope.year = null;
      $scope.film = null;
      $scope.distributor = null;
      $scope.money = null;
      $scope.rank = null;
      $scope.spectator = null;
      //post textarea
      $scope.postdata = function(country, year, film, distributor, money, rank, spectator) {
          $http.post($scope.url, JSON.parse($scope.data)).then(function(response) {
             $scope.estado = response.status;
          }).catch(function (response) { //recoje el error en caso de que haya
			        $scope.estado = response.status;
			        });
      };
      
      //post inputs
      $scope.postdataform = function(country,year,film,distributor,money,rank,spectator){
       var dato = {
              country: country,
              year: year,
              film: film,
              distributor: distributor,
              money: money,
              rank: rank,
              spectator: spectator

          };  
          $http.post($scope.url, JSON.stringify(dato)).then(function(response) {
            $scope.estado = response.status;
          }).catch(function (response) { //recoje el error en caso de que haya
			        $scope.estado = response.status;
			        });
      };
      
      //put
       $scope.putdataform = function(country, year, film, distributor, money, rank, spectator) {
         
          $http.put($scope.url, JSON.parse($scope.data)).then(function(response) {
              $scope.estado = response.status;
          }).catch(function (response) { //recoje el error en caso de que haya
			        $scope.estado = response.status;
			        });
      };
      
      //delete
      $scope.deletedata = function(country, year, film, distributor, money, rank, spectator) {
          var dato = {
              country: country,
              year: year,
              film: film,
              distributor: distributor,
              money: money,
              rank: rank,
              spectator: spectator

          };
          $http.delete($scope.url, JSON.stringify(dato)).then(function(response) {
                $scope.estado = response.status;
          }).catch(function (response) { //recoje el error en caso de que haya
			        $scope.estado = response.status;
			        });
      };
      
      //loadInitialData
      $scope.loadData = function() {
          
          $http.get($scope.url, JSON.stringify($scope.data)).then(function(response) {
                $scope.estado = response.status;
          }).catch(function (response) { //recoje el error en caso de que haya
			        $scope.estado = response.status;
			        })
      };

  }]);
  