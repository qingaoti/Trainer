var teamChart = (function () {

    var opt =  {
        title: {
            text:'报名榜'
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
                data : ['李明源', '费翔', '王玉玉'],
                axisLabel:{
                    textStyle:{ fontSize:20}
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
                data:[ 1000, 100, 21]
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
        this.chart.setOption(opt);
        return this.chart;
	}

    chart.prototype.setData(data){
		this.chart
	}

	return chart;
})();