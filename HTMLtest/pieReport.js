var pieChart = (function () {
	var channels = {
		0: '直连',
		1: '换车网助攻',
		2: 'B端助攻',
		3: 'C端助攻'
	};

	function sumPie(target, incoming) {
		if (typeof target === 'string') {
			return target + '&' + incoming;
		} else if (typeof target === 'number') {
			return target + incoming;
		} else if (typeof target === 'object') {
			for (var i in incoming) {
				if (target[i] === undefined) {
					target[i] = Tool.clone(incoming[i]);
				} else {
					target[i] = sumPie(target[i], incoming[i]);
				}
			}
		}
		return target;
	}

	function sumPieAll(arr) {
		return arr.reduce(function (pre, cur) {
			return sumPie(pre, cur);
		}, {});
	}

	function arrText(arr, total) {
		var _sb = [];
		arr.forEach(function (item) {
			_sb.push(item.name + ": " + Tool.thousand(item.value));
			_sb.push("占比: " + (100 * item.value / total[item.key]).toFixed(2) + "%");
			_sb.push('');
		});
		return _sb.join('\n');
	}

	function pieLabelFormat(params) {
		return params.name + '\n' + Tool.thousand(params.value) + '~' + params.percent + "%";
	}

	var _series = [
		{
			type: 'pie',
			radius: [0, '25%'],
			center: ['50%', 165],
			label: {
				normal: {
					position: 'outside',
					formatter: pieLabelFormat
				}
			},
			labelLine: {
				normal: { length: 8, length2: 5 }
			},
			data: []
					    		},
		{
			type: 'pie',
			radius: [0, '20%'],
			center: ['50%', 330],
			label: {
				normal: { position: 'outside', formatter: pieLabelFormat }
			},
			labelLine: {
				normal: { length: 8, length2: 5 }
			},
			data: []
					    		},
		{
			type: 'pie',
			radius: [0, '15%'],
			center: ['50%', 460],
			label: {
				normal: { position: 'outside', formatter: pieLabelFormat }
			},
			data: []
					}
	];

	var _title = [
		{
			text: '',
			subtext: '',
			x: '50%',
			y: 65,
			textAlign: 'center',
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal'
			},
			subtextStyle: {
				color: '#777777'
			}
		    },
		{
			text: '',
			subtext: '',
			x: '50%',
			y: 230,
			textAlign: 'center',
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal'
			},
			subtextStyle: {
				color: '#777777'
			}
		    },
		{
			text: '',
			subtext: '',
			x: '50%',
			y: 400,
			textAlign: 'center',
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal'
			},
			subtextStyle: {
				color: '#777777'
			}
		}];

	var opt = {
		title: _title,
		legend: [
			{
				data: (function (channels) {
					var _rst = [];
					for (var i in channels) {
						_rst.push(channels[i]);
					}
					return _rst;
				})(channels),
				top: 5
		}],
		series: _series
	};

	function chart(data, chartId) {
		echartWrapper.apply(this, arguments);
		this.Option(opt);
	}

	Tool.inheritPrototype(chart, echartWrapper);

	chart.prototype.saveRange = function (start, end) {
		this.start = start === undefined ? 0 : start;
		this.end = end === undefined ? '2217/12' : end;
	};


	chart.prototype.setPieDataOptions = function (data) {
		var that = this;
		var _data = _.filter(data, function (item) {
			return item.key >= that.start && item.key <= that.end;
		});


		var _dataToRender = sumPieAll(_data);
		_series.forEach(function (item) {
			item.data = [];
			_title[0].text = '无报名';
			_title[1].text = '无支付';
			_title[2].text = '无成交';
		});

		var _total = {};
		for (var i in _dataToRender) {
			if (i !== 'key') {
				var _cat = _dataToRender[i];
				var _arr = [];
				_total[i] = 0;
				for (var j in _cat) {
					if (_cat[j] !== 0) {
						_arr.push({ name: channels[j], value: _cat[j], key: i });
						_total[i] += _cat[j];
					}
				}

				if (i === 'reg') {
					_series[0].data = _arr;
					_title[0].text = '报名数合计 ' + Tool.thousand(_total.reg);
				} else if (i === 'pay') {
					_series[1].data = _arr;
					_title[1].text = '支付数合计 ' + Tool.thousand(_total.pay);
				} else if (i === 'deal') {
					_series[2].data = _arr;
					_title[2].text = '成交数合计 ' + Tool.thousand(_total.deal);
				}
			}
		}
	};


	chart.prototype.paint = function (start, end) {
		if (!this.statuChangeValidation()) {
			return;
		}
		this.saveRange(start, end);
		this.setPieDataOptions(this.data);
		this.render(true);
	};


	function dataFormat(item, behaviour, channel) {
		if (item[behaviour] === undefined) {
			return 0;
		}

		if (item[behaviour][channel] === undefined) {
			return 0;
		}
		return Tool.shortForKAndM(item[behaviour][channel]);
	}

	function dataJohnFormat(item, behaviour) {
		if (item[behaviour] === undefined) {
			return 0;
		}

		var _sum = 0;
		for (var i in item[behaviour]) {
			_sum += item[behaviour][i];
		}
		return Tool.shortForKAndM(_sum);
	}


	chart.prototype.toTable = function (start, end) {
		if (!this.dataStatuChangeValidation(start, end)) {
			return;
		}
		this.saveDataRange(start, end);
		var _sb = [];
		var that = this;
		var _list = _.filter(this.data, function (item) {
			return item.key >= that.start && item.key <= that.end;
		});
		var _title = '各渠道来源分类';
		_sb.push("<h5>" + _title + "</h5>");
		_sb.push("<table>");
		_sb.push("<tr>");
		_sb.push("<th rowspan='2'>时间</th>");
		_sb.push("<th rowspan='2'>阶段</th>");
		_sb.push("<th rowspan='2'>直连</th>");
		_sb.push("<th colspan='3'>助攻</th>");
		_sb.push("<th rowspan='2'>合计</th>");
		_sb.push("</tr>");
		_sb.push("<tr>");
		_sb.push("<th>换车网</th>");
		_sb.push("<th>B端</th>");
		_sb.push("<th>C端</th>");
		_sb.push("</tr>");

		_list.reverse().forEach(function (line) {
			_sb.push("<tr>");
			_sb.push("<td rowspan='3'>");
			_sb.push(line.key);
			_sb.push("</td>");
			_sb.push("<td>报名</td>");
			_sb.push("<td>" + dataFormat(line, 'reg', '0') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'reg', '1') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'reg', '2') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'reg', '3') + "</td>");
			_sb.push("<td>" + dataJohnFormat(line, 'reg') + "</td>");
			_sb.push("</tr>");


			_sb.push("<tr>");
			_sb.push("<td>支付</td>");
			_sb.push("<td>" + dataFormat(line, 'pay', '0') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'pay', '1') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'pay', '2') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'pay', '3') + "</td>");
			_sb.push("<td>" + dataJohnFormat(line, 'pay') + "</td>");
			_sb.push("</tr>");

			_sb.push("<tr>");
			_sb.push("<td>成交</td>");
			_sb.push("<td>" + dataFormat(line, 'deal', '0') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'deal', '1') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'deal', '2') + "</td>");
			_sb.push("<td>" + dataFormat(line, 'deal', '3') + "</td>");
			_sb.push("<td>" + dataJohnFormat(line, 'deal') + "</td>");
			_sb.push("</tr>");
		});
		// _sb.push("<tr>");
		// _sb.push("<td>合计</td>");
		// _sb.push("<td>" + Tool.shortForKAndM(_sum.pv) + "</td>");
		// _sb.push("<td>" + Tool.shortForKAndM(_sum.share) + "</td>");
		// _sb.push("<td>" + Tool.shortForKAndM(_sum.reg) + "</td>");
		// _sb.push("<td>" + Tool.shortForKAndM(_sum.pay) + "</td>");
		// _sb.push("<td>" + Tool.shortForKAndM(_sum.deal) + "</td>");
		// _sb.push("<td></td>");
		// _sb.push("</tr>");
		_sb.push("</table>");
		this.databox.innerHTML = _sb.join("");
	};

	return chart;
})();