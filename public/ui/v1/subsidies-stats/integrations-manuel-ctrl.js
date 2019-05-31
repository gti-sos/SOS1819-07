var app = angular.module("publicApp");


app.controller("integrationsManuelCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("IntegrationCtrl initicialized!");
    
    //API grupo 11
    
    var apiG11 = "/ui/v1/subsidies-stats/proxyApiG11";
    
    var apiGB = "/ui/v1/subsidies-stats/GHIBLI";
    
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
    
}]);