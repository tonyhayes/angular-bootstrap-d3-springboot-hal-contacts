/**
 * Created by anthonyhayes on 5/20/14.
 * refer to http://krispo.github.io/angular-nvd3/#/quickstart
 * when formulating data or adding new functions
 */
angular.module('customersApp.chartService', [])
    .service('ChartService', function FormService() {

        return {
            chart: {
                discreteBarChart: {
                    chart: {
                        type: 'discreteBarChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 100,
                            left: 55
                        },
                        x: function (d) {
                            return d.label;
                        },
                        y: function (d) {
                            return d.value;
                        },
                        showValues: true,
                        valueFormat: function (d) {
                            return d3.format(',.4f')(d);
                        },
                        transitionDuration: 500,
                        xAxis: {
                            axisLabel: 'X Axis'
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            axisLabelDistance: 30
                        }
                    }
                },
                lineChart: {
                    chart: {
                        type: 'lineChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 40,
                            left: 55
                        },
                        x: function (d) {
                            return d.x;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        useInteractiveGuideline: true,
                        dispatch: {
                            stateChange: function (e) {
                                console.log("stateChange");
                            },
                            changeState: function (e) {
                                console.log("changeState");
                            },
                            tooltipShow: function (e) {
                                console.log("tooltipShow");
                            },
                            tooltipHide: function (e) {
                                console.log("tooltipHide");
                            }
                        },
                        xAxis: {
                            axisLabel: 'X Axis'
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            tickFormat: function (d) {
                                return d3.format('.02f')(d);
                            },
                            axisLabelDistance: 30
                        }
                    }
                },
                cumulativeLineChart: {
                    chart: {
                        type: 'cumulativeLineChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 65
                        },
                        x: function (d) {
                            return d[0];
                        },
                        y: function (d) {
                            return d[1] / 100;
                        },
                        average: function (d) {
                            return d.mean / 100;
                        },

                        color: d3.scale.category10().range(),
                        transitionDuration: 300,
                        useInteractiveGuideline: true,
                        clipVoronoi: false,

                        xAxis: {
                            axisLabel: 'X Axis',
                            tickFormat: function (d) {
                                return d3.time.format('%m/%d/%y')(new Date(d));
                            },
                            showMaxMin: false,
                            staggerLabels: true
                        },

                        yAxis: {
                            axisLabel: 'Y Axis',
                            tickFormat: function (d) {
                                return d3.format(',.1%')(d);
                            },
                            axisLabelDistance: 20
                        }
                    }
                },
                stackedAreaChart: {
                    chart: {
                        type: 'stackedAreaChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 40
                        },
                        x: function (d) {
                            return d[0];
                        },
                        y: function (d) {
                            return d[1];
                        },
                        useVoronoi: false,
                        clipEdge: true,
                        transitionDuration: 500,
                        useInteractiveGuideline: true,
                        xAxis: {
                            showMaxMin: false,
                            tickFormat: function (d) {
                                return d3.time.format('%x')(new Date(d));
                            }
                        },
                        yAxis: {
                            tickFormat: function (d) {
                                return d3.format(',.2f')(d);
                            }
                        }
                    }
                },
                multiBarChart: {
                    chart: {
                        type: 'multiBarChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 45
                        },
                        clipEdge: true,
                        staggerLabels: true,
                        transitionDuration: 500,
                        stacked: true,
                        xAxis: {
                            axisLabel: 'X Axis',
                            showMaxMin: false,
                            tickFormat: function (d) {
                                return d3.format(',f')(d);
                            }
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            axisLabelDistance: 40,
                            tickFormat: function (d) {
                                return d3.format(',.1f')(d);
                            }
                        }
                    }
                },
                historicalBarChart: {
                    chart: {
                        type: 'historicalBarChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 50
                        },
                        x: function (d) {
                            return d[0];
                        },
                        y: function (d) {
                            return d[1] / 100000;
                        },
                        showValues: true,
                        valueFormat: function (d) {
                            return d3.format(',.1f')(d);
                        },
                        transitionDuration: 500,
                        xAxis: {
                            axisLabel: 'X Axis',
                            tickFormat: function (d) {
                                return d;
                            },
                            rotateLabels: 50,
                            showMaxMin: false
                        },
                        yAxis: {
                            axisLabel: 'Count',
                            axisLabelDistance: 35,
                            tickFormat: function (d) {
                                return d3.format(',.1f')(d);
                            }
                        }
                    }
                },
                multiBarHorizontalChart: {
                    chart: {
                        type: 'multiBarHorizontalChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 150
                        },
                        x: function (d) {
                            return d.label;
                        },
                        y: function (d) {
                            return d.value;
                        },
                        showControls: true,
                        showValues: true,
                        transitionDuration: 500,
                        xAxis: {
                            showMaxMin: false
                        },
                        yAxis: {
                            axisLabel: 'Opportunities',
                            tickFormat: function (d) {
                                return d3.format(',.2f')(d);
                            }
                        }
                    }

                },
                pieChart: {
                    chart: {
                        type: 'pieChart',
                        height: 900,
                        x: function (d) {
                            return d.key;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        showLabels: true,
                        transitionDuration: 500,
                        labelThreshold: 0.02,
                        legend: {
                            margin: {
                                top: 5,
                                right: 35,
                                bottom: 25,
                                left: 0
                            }
                        }
                    }

                },
                scatterChart: {
                    chart: {
                        type: 'scatterChart',
                        height: 450,
                        color: d3.scale.category10().range(),
                        scatter: {
                            onlyCircles: false
                        },
                        showDistX: true,
                        showDistY: true,
                        tooltipContent: function (key) {
                            return '<h3>' + key + '</h3>';
                        },
                        transitionDuration: 350,
                        xAxis: {
                            axisLabel: 'X Axis',
                            tickFormat: function (d) {
                                return d3.format('.02f')(d);
                            }
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            tickFormat: function (d) {
                                return d3.format('.02f')(d);
                            },
                            axisLabelDistance: 30
                        }
                    }

                },
                lineWithFocusChart: {
                    chart: {
                        type: 'lineWithFocusChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 40
                        },
                        transitionDuration: 500,
                        xAxis: {
                            axisLabel: 'X Axis',
                            tickFormat: function (d) {
                                return d3.format(',f')(d);
                            }
                        },
                        x2Axis: {
                            tickFormat: function (d) {
                                return d3.format(',f')(d);
                            }
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            tickFormat: function (d) {
                                return d3.format(',.2f')(d);
                            },
                            rotateYLabel: false
                        },
                        y2Axis: {
                            tickFormat: function (d) {
                                return d3.format(',.2f')(d);
                            }
                        }

                    }
                },
                linePlusBarChart: {
                    chart: {
                        type: 'linePlusBarChart',
                        height: 450,
                        margin: {
                            top: 30,
                            right: 60,
                            bottom: 50,
                            left: 75
                        },
                        x: function (d, i) {
                            return i;
                        },
                        y: function (d) {
                            return d[1];
                        },
                        color: d3.scale.category10().range(),
                        transitionDuration: 250,
                        xAxis: {
                            axisLabel: 'X Axis',
                            showMaxMin: false,
                            tickFormat: function (d) {
                                var dx = $scope.data[0].values[d] && $scope.data[0].values[d][0] || 0;
                                return dx ? d3.time.format('%x')(new Date(dx)) : '';
                            },
                            staggerLabels: true
                        },
                        y1Axis: {
                            axisLabel: 'Y1 Axis',
                            tickFormat: function (d) {
                                return d3.format(',f')(d);
                            }
                        },
                        y2Axis: {
                            axisLabel: 'Y2 Axis',
                            tickFormat: function (d) {
                                return '$' + d3.format(',.2f')(d);
                            }
                        }
                    }
                },
                scatterPlusLineChart: {
                    chart: {
                        type: 'scatterPlusLineChart',
                        height: 450,
                        color: d3.scale.category10().range(),
                        scatter: {
                            onlyCircles: false
                        },
                        showDistX: true,
                        showDistY: true,
                        tooltipContent: function (key) {
                            return '<h3>' + key + '</h3>';
                        },
                        transitionDuration: 350,
                        xAxis: {
                            axisLabel: 'X Axis',
                            tickFormat: function (d) {
                                return d3.format('.02f')(d);
                            }
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            tickFormat: function (d) {
                                return d3.format('.02f')(d);
                            },
                            axisLabelDistance: 30
                        }
                    }

                },
                linePlusBarWithFocusChart: {
                    chart: {
                        type: 'linePlusBarWithFocusChart',
                        height: 500,
                        margin: {
                            top: 30,
                            right: 75,
                            bottom: 50,
                            left: 75
                        },
                        bars: {
                            forceY: [0]
                        },
                        bars2: {
                            forceY: [0]
                        },
                        color: ['#2ca02c', 'darkred'],
                        x: function (d, i) {
                            return i;
                        },
                        xAxis: {
                            axisLabel: 'X Axis',
                            tickFormat: function (d) {
                                var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                                if (dx > 0) {
                                    return d3.time.format('%x')(new Date(dx));
                                }
                                return null;
                            }
                        },
                        x2Axis: {
                            tickFormat: function (d) {
                                var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                                return d3.time.format('%b-%Y')(new Date(dx));
                            },
                            showMaxMin: false
                        },
                        y1Axis: {
                            axisLabel: 'Y1 Axis',
                            tickFormat: function (d) {
                                return d3.format(',f')(d);
                            }
                        },
                        y2Axis: {
                            axisLabel: 'Y2 Axis',
                            tickFormat: function (d) {
                                return '$' + d3.format(',.2f')(d);
                            }
                        },
                        y3Axis: {
                            tickFormat: function (d) {
                                return d3.format(',f')(d);
                            }
                        },
                        y4Axis: {
                            tickFormat: function (d) {
                                return '$' + d3.format(',.2f')(d);
                            }
                        }
                    }

                },
                donutChart: {
                    chart: {
                        type: 'pieChart',
                        height: 450,
                        donut: true,
                        x: function (d) {
                            return d.key;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        showLabels: true,

                        pie: {
                            startAngle: function (d) {
                                return d.startAngle / 2 - Math.PI / 2;
                            },
                            endAngle: function (d) {
                                return d.endAngle / 2 - Math.PI / 2;
                            }
                        },
                        transitionDuration: 500,
                        legend: {
                            margin: {
                                top: 5,
                                right: 140,
                                bottom: 5,
                                left: 0
                            }
                        }
                    }
                },
                bulletChart: {
                    chart: {
                        type: 'bulletChart',
                        transitionDuration: 500
                    }

                },
                sparklinePlus: {
                    chart: {
                        type: 'sparklinePlus',
                        height: 450,
                        x: function (d, i) {
                            return i;
                        },
                        xTickFormat: function (d) {
                            return d3.time.format('%x')(new Date($scope.data[d].x));
                        },
                        transitionDuration: 250
                    }
                },
                parallelCoordinates: {
                    chart: {
                        type: 'parallelCoordinates',
                        height: 450,
                        margin: {
                            top: 30,
                            right: 40,
                            bottom: 50,
                            left: 0
                        },
                        dimensions: [
                            "economy (mpg)",
                            "cylinders",
                            "displacement (cc)",
                            "power (hp)",
                            "weight (lb)",
                            "0-60 mph (s)",
                            "year"
                        ]
                    }
                },
                multiChart: {
                    chart: {
                        type: 'multiChart',
                        height: 450,
                        margin: {
                            top: 30,
                            right: 60,
                            bottom: 50,
                            left: 70
                        },
                        color: d3.scale.category10().range(),
                        //useInteractiveGuideline: true,
                        transitionDuration: 500,
                        xAxis: {
                            tickFormat: function (d) {
                                return d3.format(',f')(d);
                            }
                        },
                        yAxis1: {
                            tickFormat: function (d) {
                                return d3.format(',.1f')(d);
                            }
                        },
                        yAxis2: {
                            tickFormat: function (d) {
                                return d3.format(',.1f')(d);
                            }
                        }
                    }

                },
                lineWithFisheyeChart: {
                    chart: {
                        type: 'lineWithFisheyeChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 50
                        },
                        xAxis: {
                            axisLabel: 'X Axis'
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            tickFormat: function (d) {
                                return d3.format(',.2f')(d);
                            },
                            axisLabelDistance: 35
                        }
                    }

                }




            }




        };

    });
