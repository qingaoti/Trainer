var s = undefined;
var a = '';
var c = 0;
//
// function  check(a) {
//     if(a) return true;
//     return false;
// }
//
// console.log(check(false));

var d = {
    two: 2
};
var list = [5];

list.unshift(1);
list.unshift(2);

console.log(list);

var autoEdit =
{
    _id: '58b630b86b7339d016537e90',
    mct_id: '565d10b144bd907a078b4567',
    mct_name: '红雷二手车',
    mct_sname: '红雷二手车',
    create_by: '580580de74d7eb017679f155',
    img: {
        front_45: 'ercar/25aa1f51fe2511e68897bd235f7ca0fe',
        rear_45: 'ercar/272107e1fe2511e68897bd235f7ca0fe',
        front: 'ercar/298eac81fe2511e68897bd235f7ca0fe',
        rear: 'ercar/2a8ae6d1fe2511e68897bd235f7ca0fe',
        front_row: 'ercar/27980ca1fe2511e68897bd235f7ca0fe',
        center: 'ercar/2b45f971fe2511e68897bd235f7ca0fe',
        engine: 'ercar/2b8106a1fe2511e68897bd235f7ca0fe',
        trunk: 'ercar/2c872c01fe2511e68897bd235f7ca0fe',
        other: []
    },
    model_name: '2004款 156 2.0',
    model_id: '23183',
    series_name: '156',
    series_id: '2284',
    brand_name: '阿尔法·罗密欧',
    date_reg: '2014-04-30T16:00:00.000Z',
    date_annual_check: '',
    date_insurance: '',
    date_business: '',
    city_id: '253',
    city_name: '临汾',
    prov_id: '6',
    prov_name: '山西',
    colour: '2',
    gearbox: 'auto',
    size: 1.5,
    turbo: false,
    mileage: 2,
    memo: '2',
    transfer_times: 2,
    price_merchant: 2,
    tst_type: 'platform',
    red_enabled: true,
    red_mctVal: 69.11,
    red_tstVal: 100,
    red_tstCount: 10,
    red_reset: true
};

var list = [
    {
        imgkey: 1111,
        imgUrl: 2222
    }, {
        imgkey: 2222,
        imgUrl: 2222
    }, {
        imgkey: 3333,
        imgUrl: 2222
    }, {
        imgkey: 4444,
        imgUrl: 2222
    }, {
        imgkey: 5555,
        imgUrl: 2222
    }, {
        imgkey: 6666,
        imgUrl: 2222
    }, {
        imgkey: 7777,
        imgUrl: 2222
    }, {
        imgkey: 8888,
        imgUrl: 2222
    }, {
        imgkey: 9999,
        imgUrl: 2222
    }
];


/**
 * 进入数据库之前的 格式化图片 工具
 * @param car  车的信息
 */
function formatInImgTest(list, car) {
    if (!(list instanceof Array)) return '不是数组对象';
    // if(list.length < 8 || list.length > 15) throw '数组的长度不合法';

    car.img.front_45 = list[0] ? list[0].imgkey : "";
    car.img.rear_45 = list[1]  ? list[1].imgkey : "";
    car.img.front_row = list[2] ? list[2].imgkey : "";
    car.img.center = list[3] ? list[3].imgkey : "";
    car.img.front = list[4]  ? list[4].imgkey : "";
    car.img.rear = list[5] ? list[5].imgkey : "";
    car.img.engine = list[6] ? list[6].imgkey : "";
    car.img.trunk = list[7] ? list[7].imgkey : "";

    for (var i = 8; i < list.length; i++) {
        var obj = {
            url: list[i].imgkey
        };
        car.img.other.push(obj);
    }

    return car;
}

// var obj = formatInImgTest(list, autoEdit);


