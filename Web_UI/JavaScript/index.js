
setInterval("IndexDate.innerHTML= new Date().Format('yyyy-MM-dd hh:mm:ss')", 1000);
$(function () {
    LoadBioProduct();
    LoadBioEngineering();
    LoadBioEnergy();
    LoadMarshCondition();
})
//全国沼气生产量
function LoadBioProduct() {
    $('#BioProduct').highcharts({
        chart: {
            type: 'spline',
            backgroundColor: '#000F3B'
        },
        title: {
            show: false,
            text: ''
        },
        xAxis: {

            tickLength: 0,
            lineColor: '#2d81a6',
            lineWidth: 1,
            title: {
                text: ''
            },
            categories: ['2007', '2008', '2009', '2010', '2011', '2012',
                         '2013', '2014', '2015', '2016', '2017']
        },
        yAxis: {

            endOnTick: false,//不强制结束坐标轴刻度线
            gridLineColor: '#2d81a6',//网格线线条颜色
            gridLineWidth: 1,//网格线线条宽度，设置为0时 不显示网格线
            tickInterval: 2,//刻度间隔
            tickLength: 1,//刻度线长度
            lineColor: '#2d81a6',//坐标轴刻度线颜色
            lineWidth: 1,//坐标轴刻度线宽度，设置为0时 不显示刻度线
            title: {
                enabled: false
            }

        },
        tooltip: {
            show: false,
            crosshairs: false,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 0,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: '生产量',
            data: [3000, 4000, 2700, 2900, 5000, 4978, 3651, 4562, 4102, 3789, 3333]
        }]
    });
}
//全国沼气工程数
function LoadBioEngineering() {
    var myChart = echarts.init(document.getElementById("BioEngineering"));
    var option = {
        //backgroundColor: '#020c2b',

        tooltip: {

        },
        grid: {
            x:40,
            y: 20,
            x2: 20,
            y2: 30
        },
        legend: {
            show: false,
            data: ['产量'],
            textStyle: {
                color: 'white'
            }
        },
        xAxis: {

            data: ['江苏', '辽宁', '浙江', '四川', '福建', '湖北', '安徽', '河南', '北京'],
            axisLabel: {
                textStyle: {
                    color: '#2d81a6'
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#2d81a6"
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {

            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#2d81a6'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#2d81a6'
                }
            }



        },
        series: [{
            name: '产量',
            type: 'bar',
            data: [255, 75, 36, 300, 78, 45, 21, 150, 120]
        }],
        markPoint: {
            data: [
               { name: '最大值', type: 'max' },
               { name: '最小值', type: 'min' }
            ]
        },
        itemStyle: {
            normal: {
                color: '#32e4e4',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    };
    myChart.setOption(option);
}
//全国生物质能
function LoadBioEnergy() {
    var myChart = echarts.init(document.getElementById("BioEnergy"));
    var option = {
        backgroundColor: '#000F3B',

        tooltip: {

        },
        grid: {
            x: 40,
            y: 20,
            x2: 20,
            y2: 30
        },
        legend: {
            show: false,
            data: ['质能总量'],
            textStyle: {
                color: 'white'
            }
        },
        xAxis: {

            data: ['重庆', '成都', '南充', '绵阳', '自贡', '宜宾', '达州', '资阳', '内江','江油'],
            axisLabel: {
                textStyle: {
                    color: '#2d81a6'
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#2d81a6"
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {

            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#2d81a6'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#2d81a6'
                }
            }



        },
        series: [{
            name: '产量',
            type: 'bar',
            data: [255, 75, 36, 300, 78, 45, 21, 150, 120]
        }],
        markPoint: {
            data: [
               { name: '最大值', type: 'max' },
               { name: '最小值', type: 'min' }
            ]
        },
        itemStyle: {
            normal: {
                color: '#32e4e4',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    };
    myChart.setOption(option);
}
//沼气使用情况
function LoadMarshCondition() {
    var myChart = echarts.init(document.getElementById("MarshCondition"));
    var option = {
        backgroundColor: '#000F3B',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            formatter: '{name}',
            textStyle: {
                color: '#2d81a6'
            },
            left: '250px',
            top: 'middle',
            orient: 'vertical',
            x: 'left',
            data: ['发电', '分解', '燃烧', '浪费', '其它']
        },
        series: [
            {
                name: '沼气使用情况',
                type: 'pie',
                radius: ['35%', '55%'],
                center:['30%','50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 335, name: '发电' },
                    { value: 310, name: '分解' },
                    { value: 234, name: '燃烧' },
                    { value: 135, name: '浪费' },
                    {value: 220,name:'其它'}

                ]
            }
        ]
    };

    myChart.setOption(option);
}