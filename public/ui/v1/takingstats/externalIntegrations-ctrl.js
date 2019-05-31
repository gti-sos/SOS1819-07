var app = angular.module("publicApp");


app.controller("ExternalIntegrationsCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("ExternalIntegrationsCtrl initicialized!");

    var myApi = "https://sos1819-07.herokuapp.com/api/v1/takingstats";
    var api5 = "/ui/v1/takingstats/proxy5";
    var api6 = "/ui/v1/takingstats/proxy6";
   
    //API de star wars
    $http.get(api5).then(function(response) {
        $http.get(myApi).then(function(response2) {
            
            am4core.ready(function() {

                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("chartdiv", am4charts.XYChart);
                chart.scrollbarX = new am4core.Scrollbar();

                // Add data
                chart.data = [{
                    "country": response.data.results[0].name,
                    "visits": response2.data[0].money
                }, {
                    "country": response.data.results[1].name,
                    "visits": response2.data[1].money
                }, {
                    "country": response.data.results[2].name,
                    "visits": response2.data[2].money
                }, {
                    "country": response.data.results[3].name,
                    "visits": response2.data[3].money
                }, {
                    "country": response.data.results[4].name,
                    "visits": response2.data[4].money
                }];

                // Create axes
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 30;
                categoryAxis.renderer.labels.template.horizontalCenter = "right";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.renderer.labels.template.rotation = 270;
                categoryAxis.tooltip.disabled = true;
                categoryAxis.renderer.minHeight = 110;

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.minWidth = 50;

                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.sequencedInterpolation = true;
                series.dataFields.valueY = "visits";
                series.dataFields.categoryX = "country";
                series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
                series.columns.template.strokeWidth = 0;

                series.tooltip.pointerOrientation = "vertical";

                series.columns.template.column.cornerRadiusTopLeft = 10;
                series.columns.template.column.cornerRadiusTopRight = 10;
                series.columns.template.column.fillOpacity = 0.8;

                // on hover, make corner radiuses bigger
                var hoverState = series.columns.template.column.states.create("hover");
                hoverState.properties.cornerRadiusTopLeft = 0;
                hoverState.properties.cornerRadiusTopRight = 0;
                hoverState.properties.fillOpacity = 1;

                series.columns.template.adapter.add("fill", function(fill, target) {
                    return chart.colors.getIndex(target.dataItem.index);
                });

                // Cursor
                chart.cursor = new am4charts.XYCursor();

            }); // end am4core.ready()

        });
    });
    
    $http.get(api6).then(function(response) {
        $http.get(myApi).then(function(response2) {
            
        });
    });
}]);
