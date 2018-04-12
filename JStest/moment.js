var moment = require('moment');
// var rst = {"code":200,"error":false,"message":"回调成功","data":{"code":400,"error":true,"message":"[NOTENOUGH]可用余额不足，请充值后重新发起"}};
// console.log(rst);
//
// if(rst.data.code != 200){
//     throw new Error(rst.data.message);
// }

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

console.log(moment().subtract(-60, 'days').format("YYYY/MM"));

//得到半年后的时间
console.log(moment().add(6, 'months').format("YYYY/MM"));

//得到季度
console.log(moment().quarter());


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

