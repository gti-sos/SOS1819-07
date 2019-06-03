var app = angular.module("publicApp");


app.controller("integrationsManuelCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("IntegrationCtrl initicialized!");
    
    //API grupo 11
    
    var apiG11 = "/ui/v1/subsidies-stats/proxyApiG11";
    
    var apiGB = "/ui/v1/subsidies-stats/GHIBLI";
    
    var apiQ = "https://breaking-bad-quotes.herokuapp.com/v1/quotes/5";
    
    var apiG12 = "https://sos1819-12.herokuapp.com/api/v1/pollution-stats";
    
    var apiDC = "https://deckofcardsapi.com/api/deck/new/draw/";
    
    var API = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats";
    
    var apiIMDB = "https://www.omdbapi.com/?i=";
    
    //USO API G11
    $http.get(apiG11).then(function(response) {
        
    var data = response.data;
    
    var chardata1 = data.map( function (item)  { 
        
        var newItem = item.country;
        
        return newItem;
        
    } );
    
    
    
    var chardata3 = data.map( function (item)  { 
        
        var newItem = item.educationExpense;
        
        return newItem;
        
    } );
    
    var chardata4 = data.map( function (item)  { 
        
        var newItem = item.educationExpensePib;
        
        return newItem;
        
    } );
    
    Highcharts.chart('container', {
    chart: {
        type: 'funnel'
    },
    title: {
        text: 'expenses in education funnel'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                softConnector: true
            },
            center: ['40%', '50%'],
            neckWidth: '30%',
            neckHeight: '25%',
            width: '80%'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'expenses in education',
        data: [
            [chardata1[0], chardata3[0]],
            [chardata1[1], chardata3[1]],
            [chardata1[2], chardata3[2]],
            [chardata1[3], chardata3[3]],
            [chardata1[4], chardata3[4]]
        ]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        dataLabels: {
                            inside: true
                        },
                        center: ['50%', '50%'],
                        width: '100%'
                    }
                }
            }
        }]
    }
});
        

    });
    
    //USO API Studio Ghibli
    $http.get(apiGB).then(function (response) {
        
    var data = response.data;
    
    var chardata1 = data.map( function (item)  { 
        
        var newItem = item.title;
        
        return newItem;
        
    } );
    
    var chardata2 = data.map( function (item)  { 
        
        var newItem = item.rt_score;
        
        return newItem;
        
    } );
        
    var defData = [{
    "film": chardata1[0],
    "RTscore": chardata2[0],
  }, {
    "film": chardata1[1],
    "RTscore": chardata2[1],
  },
   {
    "film": chardata1[2],
    "RTscore": chardata2[2],
  },
  {
    "film": chardata1[3],
    "RTscore": chardata2[3],
  },
];
var chart = new Taucharts.Chart({
  data: defData,
  type: 'horizontal-bar',
  x: 'RTscore',
  y: 'film'
});
chart.renderTo('#bar');
   


        
    });
    
    //USO API Breaking Bad quotes
    $http.get(apiQ).then(function(response){
        
        $scope.quotes = response.data;
        
    });
    $scope.refresh = function refresh(){ 
    $http.get(apiQ).then(function(response){
        
       $scope.quotes = response.data;
        
    });
    };
    
    //USO API G12
    $http.get(apiG12).then(function(response){
        
        var data = response.data;
    
    var chardata1 = data.map( function (item)  { 
        
        var newItem = item.country;
        
        return newItem;
        
    } );
    
    var chardata2 = data.map( function (item)  { 
        
        var newItem = item.year;
        
        return newItem;
        
    } );
    
    var chardata3 = data.map( function (item)  { 
        
        var newItem = item.pollution_tco2;
        
        return newItem;
        
    } );
        
        Highcharts.chart('container2', {
    chart: {
        type: 'timeline'
    },
    xAxis: {
        visible: false
    },
    yAxis: {
        visible: false
    },
    title: {
        text: 'Timeline of Spain levels of polution'
    },
    subtitle: {
        text: 'Info source: <a href="https://sos1819-12.herokuapp.com/api/v1/pollution-stats/">www.Api-G12/Pollution-stats.com</a>'
    },
    colors: [
        '#4185F3',
        '#427CDD',
        '#406AB2',
        '#3E5A8E',
        '#3B4A68',
        '#363C46'
    ],
    series: [{
        data: [{
            name: chardata2[1],
            label: chardata1[1]+':Nivel de polución:'+ chardata3[1]
        },{
            name: chardata2[2],
            label: chardata1[2]+':Nivel de polución:'+ chardata3[2]
        },{
            name: chardata2[0],
            label: chardata1[0]+':Nivel de polución:'+ chardata3[0]
        }]
    }]
});
        
    });
    
    //USO API draw a card
    $http.get(apiDC).then(function(response){
        
        
        $scope.cards = response.data.cards;
        
        console.log($scope.cards);
        
    });
    $scope.refresh2 = function refresh(){ 
    $http.get(apiDC).then(function(response){
        
        
        
       $scope.cards = response.data.cards;
        
    });
    
    };
    
    //INTEGRACIÓN API subsidies-stats con API filmaffinity
    
    
    var ID = ["tt3896102", "tt6101820", "tt5176252", "tt5187886", "tt6060156"];
    var APIKEY = "9ef01c31";
    $http.get(API).then(function (response){
        
        $scope.infos = [];
        
        $scope.films = response.data;
        
        console.log(response.data.film);
        
        
    
        
        for(var i = 0;i<ID.length;i++){
         
        $http.get(apiIMDB+ID[i]+"&apikey="+APIKEY).then(function(response){
            
            $scope.infos.push(response.data);
            
            $scope.data = angular.merge({}, $scope.films, $scope.infos);
            
        });
        
        
        
        }
        
    });
    
    
    
}]);