function echartWrapper(data, chartId, dataId) {
	this.chart = echarts.init(document.getElementById(chartId));
	if (dataId) {
		this.databox = document.getElementById(dataId);
	}
	this.store(data);
	this.saveRange();
}

echartWrapper.prototype.Option = function (option) {
	if (!this.option) {
		this.option = option;
	}
	if (!this.option) {
		throw new Error('option has not been initialized');
	}
	return this.option;
};

echartWrapper.prototype.setOption =function (option) {
	this.chart.setOption(option);
};

echartWrapper.prototype.render = function () {
	[].unshift.call(arguments, this.Option());
	this.chart.setOption.apply(this.chart, arguments);
	return this;
};

echartWrapper.prototype.getOption = function () {
	return this.chart.getOption();
};

echartWrapper.prototype.statuChangeValidation = function (start, end) {
	if (this.start !== undefined && this.end !== undefined && this.start === start && this.end === end) {
		return false;
	}
	return true;
};

echartWrapper.prototype.dataStatuChangeValidation = function (start, end) {
	if (this.dataStart !== undefined && this.dataEnd !== undefined && this.dataStart === start && this.dataEnd === end) {
		return false;
	}
	return true;
};

echartWrapper.prototype.onDataZoom = function (func) {
	this.chart.on("dataZoom", func);
};

echartWrapper.prototype.onClick = function (func) {
    this.chart.on("click", func);
};

echartWrapper.prototype.onLegendSelectChanged = function (func) {
    this.chart.on('legendselectchanged',func);
};

echartWrapper.prototype.dispatchAction = function (obj) {
    this.chart.dispatchAction(obj);
};

echartWrapper.prototype.saveRange = function (start, end) {
	this.start = start === undefined ? '2007/12' : start;
	this.end = end === undefined ? '2217/12' : end;
};

echartWrapper.prototype.saveDataRange = function (start, end) {
	this.dataStart = start === undefined ? '2007/12' : start;
	this.dataEnd = end === undefined ? '2217/12' : end;
};

echartWrapper.prototype.saveMctZoom = function (start, end) {
	this.zoomStart = start;
	this.zoomEnd = end;
	var opt = this.Option();

	if (this.zoomStart !== undefined && this.zoomEnd !== undefined) {
		opt.dataZoom.startValue = this.zoomStart;
		opt.dataZoom.endValue = this.zoomEnd;
	} else {
		opt.dataZoom.start = 0;
		opt.dataZoom.end = 100;
	}
};

echartWrapper.prototype.setXKeys = function (arr) {
	this.Option().xAxis.data = arr;
};

echartWrapper.prototype.clear = function () {
	this.chart.clear();
};

echartWrapper.prototype.store = function (data) {
	this.data = data;
};

var Tool = (function () {
	//inherit prototype
	function object(o) {
		function F() {}
		F.prototype = o;
		return new F();
	}
	return {
		inheritPrototype: function (subType, superType) {
			var prototype = object(superType.prototype);
			prototype.constructor = subType;
			subType.prototype = prototype;
		},
		thousand: function (num) {
			var re = /\d{1,3}(?=(\d{3})+$)/g;　　
			var n1 = num.toString().replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
				return s1.replace(re, "$&,") + s2;
			});　　
			return n1;
		},
		shortForKAndM: function (val) {
			if (val / 1000000 >= 1) {
				return Number((val / 1000000).toFixed(1)) + "m";
			} else if (val / 1000 >= 1) {
				return Number((val / 1000).toFixed(1)) + "k";
			}
			return val;
		},
		clone: function (target) {
			if (typeof target !== 'object') {
				return target;
			}

			var _rst = {};
			for (var i in target) {
				if (typeof target[i] === 'object') {
					_rst[i] = arguments.callee(target[i]);
				} else {
					_rst[i] = target[i];
				}
			}
			return _rst;
		}

	};
})();