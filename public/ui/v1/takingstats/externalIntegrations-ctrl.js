var app = angular.module("publicApp");


app.controller("ExternalIntegrationsCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("ExternalIntegrationsCtrl initicialized!");

    var myApi = "https://sos1819-07.herokuapp.com/api/v1/takingstats";
    var api5 = "/ui/v1/takingstats/proxy5";
    var api6 = "/ui/v1/takingstats/proxy6";
    var api7 = "/ui/v1/takingstats/proxy7";
    var api8 = "/ui/v1/takingstats/proxy8";

    //amcharts
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
    //amcharts
    $http.get(api6).then(function(response) {
        $http.get(myApi).then(function(response2) {


            am4core.ready(function() {

                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("bi", am4charts.PieChart);

                // Add data
                chart.data = [
                    { "country": response.data.Results[0].Make_Name, "litres": response2.data[0].money },
                    { "country": response.data.Results[1].Make_Name, "litres": response2.data[1].money },
                    { "country": response.data.Results[2].Make_Name, "litres": response2.data[2].money },
                    { "country": response.data.Results[3].Make_Name, "litres": response2.data[3].money },
                    { "country": response.data.Results[4].Make_Name, "litres": response2.data[4].money }
                ];

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "litres";
                pieSeries.dataFields.category = "country";
                pieSeries.slices.template.stroke = am4core.color("#fff");
                pieSeries.slices.template.strokeWidth = 2;
                pieSeries.slices.template.strokeOpacity = 1;

                // This creates initial animation
                pieSeries.hiddenState.properties.opacity = 1;
                pieSeries.hiddenState.properties.endAngle = -90;
                pieSeries.hiddenState.properties.startAngle = -90;

            }); // end am4core.ready()
        });
    });

    //morris.js
    $http.get(api7).then(function(response) {
        $http.get(myApi).then(function(response2) {
            Morris.Bar({
                element: 'bar-example',
                data: [
                    { y: response.data[0].name, a: response2.data[0].rank },
                    { y: response.data[1].name, a: response2.data[1].rank },
                    { y: response.data[2].name, a: response2.data[2].rank },
                    { y: response.data[3].name, a: response2.data[3].rank },

                ],
                xkey: 'y',
                ykeys: ['a'],
                labels: ['Series A']
            });
        });
    });

    //morris.js
    $http.get(api8).then(function(response) {
        $http.get(myApi).then(function(response2) {
            Morris.Donut({
                element: 'donut-example',
                data: [
                    { label: response.data[0].nome, value: response2.data[0].money },
                    { label: response.data[1].nome, value: response2.data[1].money },
                    { label: response.data[2].nome, value: response2.data[2].money },
                    { label: response.data[3].nome, value: response2.data[3].money },
                    { label: response.data[4].nome, value: response2.data[4].money }
                ]
            });

        });
    });
}]);
