var app = angular.module("publicApp");


app.controller("SubsidiesGraphCtrl", ["$scope", "$http", function($scope, $http) {
    
    console.log("SubsidiesGraphCtrl initicialized!");
    
    var API = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats";
    
    $http.get(API).then(function(response) {
        
    var data = response.data;
    
    var chardata1 = data.map( function (item)  { 
        
        var newItem = item.subsidyBudgetProject;
        
        return newItem;
        
    } );
    
    
    var chardata3 = data.map( function (item)  { 
        
        var newItem = item.subsidyReceibed;
        
        return newItem;
        
    } );
    
    var chardata4 = data.map( function (item)  { 
        
        var newItem = item.film;
        
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
    
    $http.get(API).then(function(response){
    
    var data = response.data;
        
    var chardata = data.map( function (item)  { 
        
        var newItem = item.film;
        
        return newItem;
        
    } );
    
    var chardata2 = data.map( function (item)  { 
        
        var newItem = item.subsidyBudgetProject;
        
        return newItem;
        
    } );
    
    var chardata3 = data.map( function (item)  { 
        
        var newItem = item.subsidyReceibed;
        
        return newItem;
        
    } );
        
        var datasource = [{
  type:'us', money: chardata2[0], film: chardata[0]
},{
  type:'us', money: chardata2[1], film: chardata[1]
},{
  type:'us', money: chardata2[2], film: chardata[2]
},{
  type:'us', money: chardata2[3], film: chardata[3]
},{
  type:'us', money: chardata2[4], film: chardata[4]
  
},{type:'bug', money: chardata3[0], film: chardata[0]
},{
  type:'bug', money: chardata3[1], film: chardata[1]
},{
  type:'bug', money: chardata3[2], film: chardata[2]
},{
  type:'bug', money: chardata3[3], film: chardata[3]
},{
  type:'bug', money: chardata3[4], film: chardata[4]
}];

var chart = new Taucharts.Chart({
    data: datasource,
    type: 'stacked-area',
    x: 'film',
    y: 'money',
    color: 'type' // there will be two lines with different colors on the chart
});

chart.renderTo(document.getElementById('line'));

        
    });
    
    $http.get(API).then(function(response) {
        
        var data = response.data;
        
        var chardata = data.map( function (item)  { 
        
        var newItem = item.film;
        
        return newItem;
        
    } );
    
    var chardata2 = data.map( function (item)  { 
        
        var newItem = item.subsidyBudgetProject;
        
        return newItem;
        
    } );
    
    var chardata3 = data.map( function (item)  { 
        
        var newItem = item.subsidyReceibed;
        
        return newItem;
        
    } );
        
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'Total subsidies received'],
                ['Spain', chardata3[2]],


            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    });
    
    
    
}]);