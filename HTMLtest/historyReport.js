var hisChart = (function () {

	var _series = [
		{ name: '报名数', type: 'line', yAxisIndex: 0, data: [],smooth:true, itemStyle: { normal: { color: '#FF9900' } } },
		{ name: '支付数', type: 'line', yAxisIndex: 0, data: [],smooth:true, itemStyle: { normal: { color: '#FF3366' } } },
		{ name: '成交数', type: 'line', yAxisIndex: 0, data: [],smooth:true, itemStyle: { normal: { color: '#990000' } } },
		{ name: '浏览量', type: 'bar', yAxisIndex: 1, data: [],smooth:true, itemStyle: { normal: { color: '#99CCFF'  } } }
	];

	var opt = {
		title: {
			text:''
		},
		legend: [{
			data: ['浏览量', '报名数', '支付数', '成交数'],
            selected:{
                '浏览量':false,
                '报名数':true,
                '支付数':false,
                '成交数':false
            }
		}],
		grid: {
			height: 150,
			top: 60
		},
		dataZoom: {
			type: 'inside',
			height: 30,
			handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			handleSize: '150%',
			zoomLock: false,
			top: 245,
			xAxisIndex: 0,
            start: 0,
            end: 100
		},
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
		xAxis: {
			data: [],
			splitLine: {
				show: false
			},
            silent :true
		},
		yAxis: [
			{
				axisLine: { lineStyle: { color: '#666' } },
				splitLine: { lineStyle: { color: '#ddd' } },
				type: 'value',
				nameLocation: 'start',
				nameTextStyle: { fontSize: 10 },
				axisLabel: {
					show: true,
					formatter: Tool.shortForKAndM
				}
			},
			{
				axisLine: { lineStyle: { color: '#0099CC' } },
				splitLine: { show: false },
				nameLocation: 'start',
				axisTick: { show: true },
				axisLabel: {
					show: true,
					formatter: Tool.shortForKAndM
				},
			}
		],
		animation: false,
		series: _series
	};

	function chart(data, chartId, dataId) {
		echartWrapper.apply(this, arguments);
		this.Option(opt);
	}

	Tool.inheritPrototype(chart, echartWrapper);

	chart.prototype.setAllDataOptions = function (data) {
		var _data = data.list;
		var _keys = data.keys;
		var _len = _keys.length;
		var _zoomStart, _zoomEnd;
		if (_len > 6) {
			_zoomStart = _len - 6;
			_zoomEnd = _len - 1;
		} else {
			_zoomStart = 0;
			_zoomEnd = _len - 1;
		}
		this.setRange(_zoomStart, _zoomEnd);
		this.setXKeys(_keys);
		for (var i in _data) {
			var _item = _data[i];
			_series[0].data.push(_item.reg ? _item.reg.val : 0);
			_series[1].data.push(_item.pay ? _item.pay.val : 0);
			_series[2].data.push(_item.deal ? _item.deal.val : 0);
			_series[3].data.push(_item.pv ? _item.pv.val : 0);
		}
	};

	chart.prototype.paint = function () {
		this.setAllDataOptions(this.data);
		this.render();
	};

	chart.prototype.getRange = function () {
		return { start: this.zoomStart, end: this.zoomEnd };
	};

	chart.prototype.setRange = function (start, end) {
		this.saveMctZoom(start, end);
		var _range = this.getRange();
		this.saveRange(this.data.list[_range.start].key, this.data.list[_range.end].key);
	};

	chart.prototype.getRangeData = function (start, end) {
		var _range;
		if (start === undefined || end === undefined) {
			_range = this.getRange();
		} else {
			_range = {
				start: start,
				end: end
			};
		}

		this.saveRange(this.data.list[_range.start].key, this.data.list[_range.end].key);
		return { start: this.data.list[_range.start].key, end: this.data.list[_range.end].key };
	};

	chart.prototype.toTable = function (url, start, end) {
		if (!this.dataStatuChangeValidation(start, end)) {
			return;
		}
		this.saveDataRange(start, end);
		var _sb = [];
		var that = this;
		var _list = _.filter(this.data.list, function (item) {
			return item.key >= that.start && item.key <= that.end;
		});
		var _title = _.first(_list).key + ' - ' + _.last(_list).key + '汇总数据';
		_sb.push("<h5>" + _title + "</h5>");
		_sb.push("<table>");
		var _isTh = false;

		var _sum = {
			pv: 0,
			share: 0,
			reg: 0,
			pay: 0,
			deal: 0
		};

		_list.reverse().forEach(function (line) {
			if (!_isTh) {
				_sb.push("<tr>");
				_sb.push("<th>时间</th>");
				for (var i in line) {
					if (line[i].txt !== undefined) {
						_sb.push("<th>");
						_sb.push(line[i].txt);
						_sb.push("</th>");
					}
				}
				if (url) {
					_sb.push("<th></th>");
				}
				_sb.push("</tr>");
				_isTh = true;
			}
			_sb.push("<tr>");
			_sb.push("<td>" + line.key + "</td>");
			for (var j in line) {
				if (line[j].txt !== undefined) {
					_sb.push("<td>");
					_sb.push(Tool.shortForKAndM(line[j].val));
					_sb.push("</td>");
				}
				if (_sum[j] !== undefined) {
					_sum[j] += line[j].val;
				}
			}
			if (url) {
				var _dateInfo = line.key.split("/");
				_sb.push("<td><a href='" + url + "/" + _dateInfo[0] + "/" + _dateInfo[1] + "'>查看</a></td>");
			}

			_sb.push("</tr>");
		});
		_sb.push("<tr>");
		_sb.push("<td>合计</td>");
		_sb.push("<td>" + Tool.shortForKAndM(_sum.pv) + "</td>");
		_sb.push("<td>" + Tool.shortForKAndM(_sum.share) + "</td>");
		_sb.push("<td>" + Tool.shortForKAndM(_sum.reg) + "</td>");
		_sb.push("<td>" + Tool.shortForKAndM(_sum.pay) + "</td>");
		_sb.push("<td>" + Tool.shortForKAndM(_sum.deal) + "</td>");
		if (url) {
			_sb.push("<td></td>");
		}
		_sb.push("</tr>");
		_sb.push("</table>");
		this.databox.innerHTML = _sb.join("");
	};

	return chart;
})();