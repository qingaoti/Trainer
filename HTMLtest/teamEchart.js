var teamChart = (function () {

    var opt =  {
        title: {
            text:''
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : [],
                axisLabel:{
                    textStyle:{ fontSize:12}
                },
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '80%',
                data:[]
            }
        ],
        label: {
            normal: {
                show: true,
                position: 'insideBottom',
                verticalAlign: 'middle',
                rotate: 90,
                fontSize: 40,
                fontWeight: 'bold',
                distance: 50,
                textStyle: {
                    color: 'black'
                }
            }
        }
    };

	function chart(chartId,title) {
        this.chart = echarts.init(document.getElementById(chartId));
        opt.title.text = title;
        if(chartId === "reg"){
            opt.color = ['#3398DB'];
		}else if (chartId === "pay"){
            opt.color = ['#dba21b'];
		}else if(chartId === "deal"){
            opt.color = ['#1cd8db'];
		}
        this.chart.setOption(opt);
	}

    chart.prototype.setData = function (data) {
        var obj = {
            xAxis:[
                {
                    data: []
                }
            ],
            series:[
                {
                    data: []
                }
            ]
        };
        obj.xAxis[0].data = data.sale;
        obj.series[0].data = data.val;
        this.chart.setOption(obj);
    };

	return chart;
})();
