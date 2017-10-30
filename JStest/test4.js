/**
 * Created by Administrator on 2017/6/13.
 */
var _ = require('lodash');

// var channel = [
//     "sms",
//     "system_erCar",
//     "wechat_bangbangsell"
// ];
//
// var result ={};
// var obj = channel.forEach(function (item,index) {
//     if(item.indexOf("system") == 0){
//         result[item] = "123";
//         return result;
//     }
//     console.log(index);
//     if(item.indexOf("wechat") == 0){
//         result[item] = "按时大";
//         return result;
//     }
// });
//
// console.log(result);


// var obj = {
//     "system_erCar":"ok"
// };
//
// var rst ={
//     "sms":{
//         code:"ok",
//         num:"9999"
//     }
// };
//
// var newobj = lodash.extend(obj, rst);
//
// console.log(obj);


// console.log(msg);


// var msg = {
//     "target_id": "580580de74d7eb017679f155",
//     "message_type": "system",
//     "channel": [
//     "sms",
//     "system_hui",
//     "wechat_huanke"
// ],
//     "content": {
//     "sms": "亲爱的帮帮收车会员，新客户15914197440想看您的奥迪A6  sms，请尽快与TA联系！",
//         "system_hui": "亲爱的帮帮收车会员，新客户15914197440想看您的奥迪A6 system，请尽快与TA联系！",
//         "wechat_huanke": {
//         "type": "sigUp",
//             "data": {
//             "first": {
//                 "value": "您好,您有一个新客户报名。",
//                     "color": "#173177"
//             },
//             "keyword1": {
//                 "value": "东风雷荣3.1车站 wechat",
//                     "color": "#173177"
//             },
//             "keyword2": {
//                 "value": "黄先生",
//                     "color": "#173177"
//             },
//             "keyword3": {
//                 "value": "15914197440",
//                     "color": "#173177"
//             },
//             "remark": {
//                 "value": "报名时间：2017年06月23日 13:03\n请登录帮帮卖车查看详情。",
//                     "color": "#173177"
//             }
//         }
//     }
// },
//     "deviceID": "admin-web",
//     "deviceType": "pc",
//     "clientVersion": "2.0.0"
// };
//
// var arr =[];
// msg.channel.forEach(function (item) {
//     if(item.indexOf("sms") == 0){
//         delete msg.content[item];
//     }else {
//         arr.push(item);
//     }
// });
// msg.channel = arr;
// console.log(msg);

// var arr = ["测试1","测试2","测试3"];
//
// var str = "亲爱的帮帮收车会员，有新客户想看您的{carinfo}，请尽快与传播人（{userName}/{userPhone}）联系！";
//
// var regex = "{[a-zA-z]*}";
// var obj =  str.match(regex);
//
// console.log(obj);
//
// arr.forEach(function (item) {
//
// });

moment().startOf('day');

function test() {
    if( 1 == 1){
        var ooo = 123;
    }

    console.log(ooo);
}


test();
