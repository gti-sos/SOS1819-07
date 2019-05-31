var app = angular.module("publicApp");


app.controller("integrationsManuelCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("IntegrationCtrl initicialized!");
    
    //API grupo 11
    
    var apiG11 = "/ui/v1/subsidies-stats/proxyApiG11";
    
    $http.get(apiG11).then(function(response) {
        
    var data = response.data;
    
    var chardata1 = data.map( function (item)  { 
        
        var newItem = item.year;
        
        return newItem;
        
    } );
    
    
    var chardata3 = data.map( function (item)  { 
        
        var newItem = item.educationExpensePub;
        
        return newItem;
        
    } );
    
    var chardata4 = data.map( function (item)  { 
        
        var newItem = item.educationExpensePib;
        
        return newItem;
        
    } );
    
    Highcharts.chart('container', {

    title: {
        text: 'subsidies received VS film budget'
    },

    yAxis: {
        title: {
            text: 'MONEEEEEEEEy'
        }
    },
    xAxis: [{
                categories: [chardata4[0], chardata4[1], chardata4[2], chardata4[3], chardata4[4]]
            }],
            
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    

    

    series: [{
        name: 'subsidies received',
        data: [chardata3[0], chardata3[1], chardata3[2], chardata3[3], chardata3[4]] 
        
    }, 
    
    {
        name: 'film budget',
        data: [chardata1[0], chardata1[1], chardata1[2], chardata1[3], chardata1[4]] 
        
    }
    
    
    ],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
        

    });
    
}]);