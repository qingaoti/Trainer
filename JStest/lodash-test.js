var _ = require('lodash');

var und = undefined;
var kong = "";
var ling = 1;
var nul = null;
var nan = NaN;
var d = '123123';
var b = 'asdcasd';
var o = {'a': 123, 'b': '123'};
var f = ['A1', 'A2', 'B4', 'M5'];
var f1 = ['A1', 'A2', 'B3', 'M4'];

let test_und = _.toNumber(und)  || 0 ;
let test_nan = _.toNumber(nan)  || 0 ;
let test_kong = _.toNumber(kong)  || 0 ;
let test_null = _.toNumber(nul)  || 0 ;
let test_b = _.toNumber(b)  || 0 ;
let test_d = _.toNumber(d)  || 0 ;

console.log("test_und",test_und);
console.log("test_nan",test_nan);
console.log("test_kong",test_kong);
console.log("test_null",test_null);
console.log("test_b",test_b);
console.log("test_d",test_d);
//
// if(!ling || ling < 0 ){
//     console.log("进来了");
//     console.log(ling);
// }
//
// var str = 'ercar/25aa1f51fe2511e68897bd235f7ca0fe';
//
// console.log(str.indexOf('ercar/') >=0);
//
// var str = '秦高梯';
//
// console.log(str.substr(0,1) + "先生");


// var deviceTypeList = ['android','ios'];
// console.log(!_.includes(deviceTypeList,"ios1"));

// var card = [
//     {
//         "isGet": false,
//         "payTime": 1530081547143.0,
//         "pay": 100,
//         "type": "open",
//         "val": 2
//     }, {
//         "isGet": false,
//         "payTime": 1530081547143.0,
//         "pay": 99,
//         "type": "recharge",
//         "val": 2
//     }, {
//         "isGet": true,
//         "payTime": 1530081547143.0,
//         "pay": 98,
//         "type": "pay",
//         "val": 2
//     }
// ];
//
// console.log("tt", _.findLast(card, {isGet: false, type: "open"}));

var data = [{
    ref_type: 'merchant',
    end_time: '2018-06-27T08:09:07.595Z',
    start_time: '2018-06-27T08:09:07.595Z',
    cp_type: 'card',
    description: '备注信息: 充值100元 送5次洗车 2次保养',
    name: 'card/时间:1530086947591',
    _id: '5b334623b28a193c36fe3643',
    isDisabled: false
}, {
        ref_type: 'merchant',
        end_time: '2018-06-27T08:09:07.602Z',
        start_time: '2018-06-27T08:09:07.601Z',
        cp_type: 'card',
        description: '备注信息: 充值100元 送5次洗车 2次保养',
        name: 'card/时间:1530086947601',
        _id: '5b334623b28a193c36fe3642',
        isDisabled: false
    },
    {
        ref_type: 'merchant',
        end_time: '2018-06-27T08:09:07.602Z',
        start_time: '2018-06-27T08:09:07.602Z',
        cp_type: 'card',
        description: '备注信息: 充值100元 送5次洗车 2次保养',
        name: 'card/时间:1530086947602',
        _id: '5b334623b28a193c36fe3644',
        isDisabled: false
    }];

// console.log("tt-data", _.map(data, "_id"));

var roles = [
    "user",
    "admin",
    "superadmin",
    "hui-user",
    "oldsc",
    "newsc",
    "carkeeper",
    "financial_specialist",
    "aftermarket_exploer",
    "act-sale",
    "act_quote",
    "er-admin",
    "link-admin",
    "link-user"
];
roles = [];
// console.log(!_.includes(roles, "carkeeper"));


// var car_status = {
//     off_sale:"off_sale",      // 下架    对应之前的是1
//         on_sale: "on_sale",       //在售     对应之前的是5
//         approval : "approval",    //审批中   对应之前的是2
//         sold: "sold"              //已售     对应之前的是10
// };
// console.log("tttt");
// console.log(_.includes(car_status,"on_sale"));

// _.forIn(car_status, function(value, key) {
//     console.log(key);
//     console.log(value)
// });
//
// _.isElement();
//
// _.isEmpty();
//
// _.isEqual();

// //
// var couponcars = {
//     "bargains" : [
// {
//     "wxuser" : {
//     "unionid" : "ov0kyv1mJ04uwtSHoSsWmYYtqhmg",
//         "openid" : "ocsyStybN9buqeJACzWcvfIWkMgY"
// },
//     "create_time" : 1488954273397.0,
//     "uid" : "57328c5ca0f8a75f1d9132bb",
//     "val" : "26.25",
//     "rest" : "473.75",
//     "rank" : 2
// },
// {
//     "uid" : "57b595ef74d7eb017679e9c2",
//     "val" : "33.75",
//     "rest" : "440.00",
//     "rank" : 2,
//     "create_time" : 1488954304919.0,
//     "wxuser" : {
//     "openid" : "ocsySt4sgNibg5MdT4LymvRMw27M",
//         "unionid" : "ov0kyv27aeYralgrNaUuo5mwk7C8"
// }
// },
// {
//     "wxuser" : {
//     "unionid" : "ov0kyv-BmUEK7vGJa9E-jdURuGNM",
//         "openid" : "ocsySt07Oa-8uFKgJsrLKg_RetI0"
// },
//     "create_time" : 1488954366672.0,
//     "uid" : "57b595ef74d7eb017679ea88",
//     "val" : "27.93",
//     "rest" : "412.07",
//     "rank" : 2
// },
// {
//     "uid" : "582131bb08a31a676132c01f",
//     "val" : 0,
//     "rest" : "412.07",
//     "rank" : 0,
//     "create_time" : 1488954441529.0,
//     "wxuser" : {
//     "openid" : "ocsyStzmj8x_vKSPiS5vctTF3XGA",
//         "unionid" : "ov0kyvyHw_RscE4tcYH7DvfMgflY"
// }
// },
// {
//     "wxuser" : {
//     "unionid" : "ov0kyv1DlBP3zneil2nx1zj86lJY",
//         "openid" : "ocsySt31dYIsnplS_j8_Z0fqWiMA"
// },
//     "create_time" : 1488954502861.0,
//     "uid" : "56494abb3e9758d90aa5b7b2",
//     "val" : "17.36",
//     "rest" : "394.71",
//     "rank" : 2
// },
// {
//     "uid" : "5721cd6df15051d30f0c911d",
//     "val" : "66.23",
//     "rest" : "328.48",
//     "rank" : 3,
//     "create_time" : 1488954531529.0,
//     "wxuser" : {
//     "openid" : "ocsySt5Qbd2JEkCt9_8yWyCnP1UU",
//         "unionid" : "ov0kyv561SgrMGK8xZE9EGK-18ZI"
// }
// },
// {
//     "wxuser" : {
//     "unionid" : "ov0kyv7Aprvcvl-_LA-FqJGfNxvU",
//         "openid" : "ocsySt44NaQD6tpv9erfw3q6FmYw"
// },
//     "create_time" : 1488954885900.0,
//     "uid" : "58bfa28d8ce6499907c7679b",
//     "val" : "50.03",
//     "rest" : "278.45",
//     "rank" : 3
// },
// {
//     "uid" : "57b595ef74d7eb017679ea89",
//     "val" : "61.35",
//     "rest" : "217.10",
//     "rank" : 3,
//     "create_time" : 1488954983916.0,
//     "wxuser" : {
//     "openid" : "ocsySt7LUuxxQ87JLntpLiqw3f6I",
//         "unionid" : "ov0kyv4kH_My-alnOGkBRwo3QU_0"
// }
// },
// {
//     "wxuser" : {
//     "unionid" : "ov0kyv50vMXhETPiEbuBY199lHDA",
//         "openid" : "ocsySt0B7Pb_QAK5d-WLpCYzMgTE"
// },
//     "create_time" : 1488955131005.0,
//     "uid" : "58bd0519fc1e19457b420337",
//     "val" : "33.10",
//     "rest" : "184.00",
//     "rank" : 2
// },
// {
//     "uid" : "58b3d28d1325f9c45e41e393",
//     "val" : "14.38",
//     "rest" : "169.62",
//     "rank" : 1,
//     "create_time" : 1488955191819.0,
//     "wxuser" : {
//     "openid" : "ocsySt87aQv9roxZrd6rZnx30km8",
//         "unionid" : "ov0kyv-CCK_AJo6XjrVJut4NfdSA"
// }
// },
// {
//     "wxuser" : {
//     "unionid" : "ov0kyv57uILsci2RotaCnIa6fiHw",
//         "openid" : "ocsySt5gCFmsViQyaQdkahtH1SqI"
// },
//     "create_time" : 1488955236574.0,
//     "uid" : "58be4cda8ce6499907c7676d",
//     "val" : "23.11",
//     "rest" : "146.51",
//     "rank" : 2
// },
// {
//     "uid" : "58bd0554fc1e19457b42033b",
//     "val" : "38.75",
//     "rest" : "107.76",
//     "rank" : 2,
//     "create_time" : 1488955273701.0,
//     "wxuser" : {
//     "openid" : "ocsyStzNphUTdaxRszTg5ycIcnTI",
//         "unionid" : "ov0kyv1NwqJBaqFIw8Gf5Ot7UJT8"
// }
// },
// {
//     "wxuser" : {
//     "unionid" : "ov0kyvy3dtx16EsR23KqXI9CopqA",
//         "openid" : "ocsyStx35wb79FjXJ8JZxEq8S_Xo"
// },
//     "create_time" : 1488955287742.0,
//     "uid" : "58a16b52edf4c997648e472c",
//     "val" : "14.04",
//     "rest" : "93.72",
//     "rank" : 1
// },
// {
//     "uid" : "57bd198440e3bfa75a8a2550",
//     "val" : "13.63",
//     "rest" : "80.09",
//     "rank" : 1,
//     "create_time" : 1488955426484.0,
//     "wxuser" : {
//     "openid" : "ocsySt4BI1QrkF-1mFeKNhp0s_s4",
//         "unionid" : "ov0kyv0ar_fuMXuGG12bs-_aIik8"
// }
// },
// {
//     "wxuser" : {
//     "unionid" : "ov0kyv7hydAYZUHlzuocQrKng614",
//         "openid" : "ocsySt-2crJSBvLCFC2SFbrZCLpo"
// },
//     "create_time" : 1488955506399.0,
//     "uid" : "",
//     "val" : "80.09",
//     "rest" : 0,
//     "rank" : 3
// }],
//     "coupon_key" : "2017021504004907531",
//     "status" : "available",
// };


//
// var count = _.findIndex(couponcars.bargains, function (bargain) {
//     return bargain.uid == '';
// });
//
// console.log(count);

// var abc = _.isEmpty(a) ? '妹纸' : a;
// console.log(abc);

// console.log("结果:"+!_.includes(car_status,"221"));


// console.log(_.toString(s));
// console.log(_.toString(a));
// console.log(_.toString(c));
//
// console.log(_.toNumber(d));
// console.log(_.toNumber(b));
// console.log(_.toNumber(o));
//
// var d1 =  parseInt(b, 10) || 10;


// console.log(_.toArray(f));

// if(!_.toNumber(b)) console.log('bud ');

// var collection1 = [
//     {name: 'aa', age:20, gender: 'm'},
//     {name: 'bb', age:21, gender: 'f'},
//     {name: 'cc', age:22, gender: 'm'}
// ];
//
// var result1 = _.reduce(collection1, {age:20, gender:'m'});
// _.forEach(result1, function(item){
//     console.log(item.name);
// });

// var arr=['user','hui-user','link-user'];
// var obj =  _.findIndex(arr,'link-user');
// console.log(obj);

var obj = {
    "keys": [
        "2016/01",
        "2016/02",
        "2016/03",
        "2016/04",
        "2016/05",
        "2016/06",
        "2016/07",
        "2016/08",
        "2016/09",
        "2016/10",
        "2016/11",
        "2016/12",
        "2017/01",
        "2017/02",
        "2017/03",
        "2017/04",
        "2017/05",
        "2017/06",
        "2017/07"
    ]
};
//
// console.log(obj.keys.indexOf("2016/02"));
//
// var car = {
//     status: 'err',
//     residual_rate: null
// };
// console.log(!_.isEmpty(car.residual_rate));
