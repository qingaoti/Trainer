var salesChart = (function () {
	function merge(target, incoming) {
		if (typeof target === 'string') {
			return target;
		} else if (typeof target === 'number') {
			return target + incoming;
		} else if (typeof target === 'object') {
			for (var i in incoming) {
				if (target[i] === undefined) {
					target[i] = Tool.clone(incoming[i]);
				} else {
					if (i === 'status') {
						target[i] = Math.min(target[i], incoming[i]);
					} else {
						target[i] = merge(target[i], incoming[i]);
					}
				}
			}
		}
		return target;
	}

	function mergeAll(arr) {
		return arr.reduce(function (pre, cur) {
			return merge(pre, cur.members);
		}, {});
	}

	var _series = [{
			name: '报名',
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					show: false,
					position: 'insideRight'
				}
			},
			data: [],
			yAxisIndex: 0
        },
		{
			name: '支付',
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					show: false,
					position: 'insideRight'
				}
			},
			data: [],
			yAxisIndex: 0
        },
		{
			name: '成交',
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					show: false,
					position: 'insideRight'
				}
			},
			data: [],
			yAxisIndex: 0
        }];

	var opt = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			left: 5,
			right: '4%',
			containLabel: true
		},
		dataZoom: {
			type: 'inside',
			width: 20,
			handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			handleSize: '180%',
			zoomLock: false,
			top: 60,
			left: 10,
			yAxisIndex: 0,
			start: 75,
			end: 100
		},
		legend: {
			data: ['报名', '支付', '成交'],
			top: 5
		},
		xAxis: {
			type: 'value'
		},
		yAxis: {
			type: 'category',
			data: [],
			position: 'right'
		},
		animation: false,
		series: _series
	};

	function chart(data, chartId) {
		echartWrapper.apply(this, arguments);
		this.Option(opt);
	}

	Tool.inheritPrototype(chart, echartWrapper);

	chart.prototype.setSalesData = function (data) {
		var that = this;
		var _list = _.filter(data, function (item) {
			return item.key >= that.start && item.key <= that.end;
		});

		var _mainMap = mergeAll(_list);
		_series.forEach(function (item) {
			item.data = [];
		});

		var _yKeys = [];
		var _salesList = [];
		for (var i in _mainMap) {
			_salesList.push(_mainMap[i]);
		}

		_salesList.sort(function (x, y) {
			if (x.deal > y.deal) {
				return 1;
			} else if (x.deal === y.deal) {
				if (x.pay > y.pay) {
					return 1;
				} else if (x.pay === y.pay) {
					if (x.reg > y.reg) {
						return 1;
					}
				}
			}

			return -1;
		});

		function formatSalesNameWithOutIndex(item) {
			var _name = item.rname;
			var _isLeave = item.status === 0 ? '(离职)' : '';
			if (_isLeave) {
				return _name + '\n' + _isLeave;
			}
			return _name;
		}

		_salesList.forEach(function (item, index) {
			item.rname = formatSalesNameWithOutIndex(item);
			_yKeys.push((_salesList.length - index) + '.' + item.rname);
			_series[0].data.push(item.reg);
			_series[1].data.push(item.pay);
			_series[2].data.push(item.deal);
		});

		this.saveFormattedData(_salesList);
		opt.yAxis.data = _yKeys;
	};

	chart.prototype.paint = function (start, end) {
		if (!this.statuChangeValidation()) {
			return;
		}
		this.saveRange(start, end);
		this.setSalesData(this.data);
		this.render(true);
	};

	chart.prototype.saveFormattedData = function (data) {
		this.formatted = data;
	};


	chart.prototype.toTable = function (start, end) {
		if (!this.dataStatuChangeValidation(start, end)) {
			return;
		}
		this.saveDataRange(start, end);
		var _sb = [];
		var that = this;
		var _list = this.formatted;

		var _title = '员工阶段汇总数据';
		_sb.push("<h5>" + _title + "</h5>");
		_sb.push("<table>");
		_sb.push("<tr>");
		_sb.push("<th>排名</th>");
		_sb.push("<th>姓名</th>");
		_sb.push("<th>报名</th>");
		_sb.push("<th>支付</th>");
		_sb.push("<th>成交</th>");
		_sb.push("</tr>");

		_list.reverse().forEach(function (item, index) {
			_sb.push("<tr>");
			_sb.push("<td>" + (index + 1) + "</td>");
			_sb.push("<td>" + item.rname + "</td>");
			_sb.push("<td>" + item.reg + "</td>");
			_sb.push("<td>" + item.pay + "</td>");
			_sb.push("<td>" + item.deal + "</td>");
			_sb.push("</tr>");

		});

		_sb.push("</table>");
		this.databox.innerHTML = _sb.join("");
	};

	return chart;
})();