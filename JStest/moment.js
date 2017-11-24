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

console.log(moment().subtract(90, 'days').format("YYYY/MM/DD"));

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