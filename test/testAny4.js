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

var obj ="2017/10/29";

var str = obj.replace(///g,'-');

console.log(str);