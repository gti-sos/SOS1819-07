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
    
    var mySeries = [];
    for (var i = 0; i < chardata4.length; i++) {
        mySeries.push([chardata4[i]]);
        i++;
    }
    
    var mySeries2 = [];
    for (var i = 0; i < chardata3.length; i++) {
        mySeries2.push([chardata3[i]]);
        i++;
    }
    
    console.log(chardata4);
    console.log(chardata3);
    console.log(mySeries);
    console.log(mySeries2);
    
    Highcharts.chart('container', {
    chart: {
        type: 'pyramid'
    },
    title: {
        text: 'Subsidies pyramid',
        x: -50
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            },
            center: ['40%', '50%'],
            width: '80%'
        }
    },
    legend: {
        enabled: false
    },
    
    tooltip: {
  formatter: function() {
    return 'The subsidy received for <b>' + chardata4[0] +
      '</b> is <b>' + this.y + '</b>';
  }
},
    
    
    series: [{
    data: chardata4,
    name: "films"
},
{   
    data: chardata3,
    name: "subsidies receives"
}]
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