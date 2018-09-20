var moment = require('moment');
var _ = require('lodash');
// var rst = {"code":200,"error":false,"message":"回调成功","data":{"code":400,"error":true,"message":"[NOTENOUGH]可用余额不足，请充值后重新发起"}};
// console.log(rst);
//
// if(rst.data.code != 200){
//     throw new Error(rst.data.message);
// }

console.log("效验时间格式",moment("2018-5", 'YYYY-MM').isValid());


// var obj = moment().startOf('day').toDate();

// var obj = moment().startOf('day').subtract(1, 'days').format();  // 昨天中午11点54分
//
// console.log(obj);

// var obj ="2017/10/29";
//
// var str = obj.replace(///g,'-');
//
// console.log(str);

// console.log(moment("2017/10","YYYY/MM").startOf('month').format("YYYY/MM/DD"));

var str = "2018年05月23日 11:51";
console.log("ttt",moment(str,"YYYY年MM月DD日 HH:mm").format("yyyy-MM-dd"));


console.log(moment().subtract(-60, 'days').format("YYYY/MM"));

//得到半年后的时间
console.log(moment().add(6, 'months').format("YYYY/MM"));

//得到季度
console.log(moment().quarter());

//比较2时间的 是不是之后
console.log("是不是之后",moment("2018-06-03").isAfter("2018-06-02"));

//开始时间
console.log("开始时间",moment("2018-06-03").format('YYYY-MM-DD HH:mm:ss'));
//结束时间
console.log("结束时间",moment("2018-06-03").add(1,'d').subtract(1,'seconds').format('YYYY-MM-DD HH:mm:ss'));

/**
 * Calcaulate diff Months between two month
 *
 * @Author   Hosea
 * @DateTime 2017-08-16T14:56:41+0800
 * @param    {Monment} StartDate
 * @param    {Monment} EndDate
 * @return   {Array} month array
 */
function calDiffMonths(StartDate, EndDate) {
    var CurrentMonth = StartDate.startOf('month');
    var Months = [];
    while (CurrentMonth <= EndDate) {
        Months.push(CurrentMonth.format("YYYY/MM/DD"));
        CurrentMonth = CurrentMonth.add(1, 'months');
    }
    return Months;
}

function getDateParam(month,type) {
    if (!_.isEmpty(month) && moment(month, 'YYYY-MM').isValid()) {
        let param = {
            startDate: moment(month).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(month).add(1, type).subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
        };
        return param;
    } else {
        return null;
    }
}

console.log("getDateParam 测试",getDateParam("2018-01","M"));

/**
 * 传入年龄 ,返回查询需要的开始时间 和结束时间
 *
 * @Author  gtqin
 * age = 一年之类   0-1
 *       3年之类    0-3
 *                  5-99
 */
function carAgeFormat(age) {
    var StrNum = age.toString().split("-");
    var low =  parseInt(StrNum[0]) || 0;
    var high = parseInt(StrNum[1]) || 0;
    var data = {
        gt: moment().subtract(high,'year').format("YYYY-MM"),
        lt: moment().subtract(low,'year').format("YYYY-MM")
    };
    return data;
}

console.log("age返回",carAgeFormat("5-99"));
console.log(calDiffMonths(moment("2016/12","YYYY/MM"),moment("2017/10","YYYY/MM")));

var obj = [{
    "trend_date": "2018-03",
    "eval_price": "6.183"
},
    {
        "trend_date": "2018-06",
        "eval_price": "5.884"
    },
    {
        "trend_date": "2018-09",
        "eval_price": "5.647"
    },
    {
        "trend_date": "2018-12",
        "eval_price": "5.509"
    },
    {
        "trend_date": "2019-03",
        "eval_price": "5.484"
    },
    {
        "trend_date": "2019-06",
        "eval_price": "5.219"
    },
    {
        "trend_date": "2019-09",
        "eval_price": "5.008"
    },
    {
        "trend_date": "2019-12",
        "eval_price": "4.886"
    },
    {
        "trend_date": "2020-03",
        "eval_price": "4.863"
    },
    {
        "trend_date": "2020-06",
        "eval_price": "4.629"
    },
    {
        "trend_date": "2020-09",
        "eval_price": "4.442"
    },
    {
        "trend_date": "2020-12",
        "eval_price": "4.334"
    },
    {
        "trend_date": "2021-03",
        "eval_price": "4.314"
    }
];



