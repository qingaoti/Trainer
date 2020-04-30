const config = require("../../config");
const models = require('../../commonModels')(config.MongoSettings);
const _ = require('lodash');
const Q = require("q");
const moment = require('moment');

const gen_count = 10;

main();

function main() {
    var g_cps = [];
    var g_urs = [];
    var g_ucs = [];
    var g_ccps = [];
    return getCarProducts().then(function (cps) {
            g_cps = cps;
            console.log("find car prod " + cps.length);
            return find_c_user().then(function (urs) {
                console.log("find user " + urs.length);

                g_urs = urs;
                var opList = [];
                for (var i = 0; i < gen_count; i++) {
                    var rdu = _.random(0, urs.length - 1);
                    var rdb = _.random(0, cps.length - 1);
                    opList.push(createUsedCar(cps[rdb], urs[rdu]))
                }
                return Q.all(opList);
            }).then(function (ucs) {
                console.log("create used car " + ucs.length);

                g_ucs = ucs;
                var opList = [];
                for (var i = 0; i < gen_count; i++) {
                    var rd = _.random(0, ucs.length - 1);
                    var rdb = _.random(0, g_cps.length - 1);
                    var rdu = _.random(0, g_urs.length - 1);
                    opList.push(createCarChangePlan(ucs[rd], g_cps[rdb], g_urs[rdu]))
                }
                return Q.all(opList);
            }).then(function (ccps) {
                console.log("create car change plan " + ccps.length);
                g_ccps = ccps;
                return models.User.find({
                    roles: {$in: ["act_quote"]},
                    merchant: {$exists: true}
                }).then(function (aqurs) {
                    console.log("find act quote " + aqurs.length);
                    var opList = [];
                    if (aqurs.length > 0) {
                        for (var i = 0; i < gen_count; i++) {
                            var rd = _.random(0, g_ccps.length - 1);
                            var rdu = _.random(0, aqurs.length - 1);
                            opList.push(create_new_car_offer(g_ccps[rd], aqurs[rdu]))
                        }
                    }
                    return Q.all(opList).then(function (ccpucos) {
                        console.log("create new car offers " + ccpucos.length);
                        return models.User.find({
                            roles: {$in: ["er-sale"]},
                        }).then(function (equrs) {
                            console.log("find er sales " + equrs.length);

                            var opList = [];
                            if (equrs.length > 0) {
                                for (var i = 0; i < gen_count; i++) {
                                    var rd = _.random(0, g_ccps.length - 1);
                                    var rdu = _.random(0, equrs.length - 1);
                                    opList.push(create_used_car_offer(g_ccps[rd], equrs[rdu]))
                                }
                            }
                            return Q.all(opList).then(function (offers) {
                                console.log("create used car offers " + offers.length);
                            });
                        })
                    })
                })
            })
        }
    ).catch(function (err) {
        console.log(err);
    }).finally(function (done) {
        console.log("done");
        process.exit();
    })
}

function getCarProducts() {
    // var result = [];
    return models.CarProduct.find({
        model: {$exists: true},
        series: {$exists: true},
        brand: {$exists: true},
        'model': {$nin: ['', null]},
        'model.modelId': {$nin: ['', null]},
        'brand': {$nin: ['', null]},
        'brand.brandChe300': {$nin: ['', null]}
    }).limit(100).lean().then(function (cps) {
        var opList = [];
        cps.forEach(function (cp) {
            opList.push(
                models.Brand.findOne({'series.models.id': cp.model.modelId}).then(function (bd) {
                    if (bd) {
                        // result.push(cp);
                        return models.CarProduct.findOne({
                            'model.modelId': cp.model.modelId,
                            model: {$exists: true},
                            series: {$exists: true},
                            brand: {$exists: true},
                        }).lean().exec();
                    }
                    return null;
                })
            );
        });
        return Q.all(opList)
    }).then(function (rsts) {
        return _.remove(rsts, null);
    })
}

function find_c_user() {
    // var phones = ['15810308128', '15914197440', '15011421722', '18672988272', '15802781775', '18502757826', '13995665025'];
    // var phones = ['15810308128', '13681436055', '18611398426', '15011421722', '13795217670', '17600107123', '15914197440', '13986502540', '18600360934'];
    var phones = ['15810308128'];
    return models.User.find({phone: {$in: phones}}).exec()
}

function createUsedCar(car_product, user) {

    var UsedCar = require('../modules/Module_web3/Module_UsedCar');

    var _usedCar = new UsedCar();

    var oldCar = {
        "brand": {
            "brand_id": "12",
            "brand_name": "扬州亚星客车"
        },
        "model": {
            "model_id": "6229",
            "model_name": "api自动测试"
        },
        "series": {
            "series_name": "亚星客车",
            "series_id": "1346"
        },
        "city": {
            "city_id": "5599373cdece166d2ffe7bb4",
            "city_name": "武汉",
            "city_che300_id": "18"
        },
        "mileage": 2.5,
        "date_reg": "2015-03",

        "vin": {
            "vin": "WDBGP57B6PB127810",
            "vin_img_key": "carproducts/20171219/1513663732oTmrf.png",
            "vin_img_text": "车架号"
        },
        //详情里面填写的字段
        "color": "黄色",
        "exterior_conditions": "优",
        "interior_conditions": "优",
        "engine_conditions": "优",
        "transfer_times": "1",
        "rescue_times": "1",
        "maintenance": "3",
        "description": "无事故,无泡水,无火烧",
        "imgs": [
            {
                "text": "左前45度",
                "key": "web3/87f58501e21311e78f9b7dd493a0c5b3"
            }
        ]
    };
    try {
        oldCar.brand.brand_id = car_product.brand.brandId;
        oldCar.brand.brand_name = car_product.brand.brandName;
        oldCar.brand.brand_che300_id = car_product.brand.brandChe300;

        oldCar.series.series_id = car_product.series.seriesId;
        oldCar.series.series_name = car_product.series.seriesName;
        oldCar.series.series_che300_id = car_product.series.seriesId;

        oldCar.model.model_id = car_product.model.modelId;
        oldCar.model.model_name = car_product.model.modelName;
        oldCar.model.model_che300_id = car_product.model.modelId;
    }
    catch (e) {
        console.log(car_product)
    }

    return _usedCar.saveCar({
        owner: user._id,
        loc: [
            114.28754,
            30.66644
        ],
        car_info: oldCar
    })
}

function createCarChangePlan(used_car, new_car, user) {
    var CarChangePlan = require('../modules/Module_web3/Module_CarChangePlan');
    var _carChangePlan = new CarChangePlan();
    return _carChangePlan.saveMyPlan(used_car._id, new_car._id, used_car.owner)
}

function create_used_car_offer(car_change_plan, user) {
    var UsedCarOffer = require('../modules/Module_web3/Module_UsedCarOffer');
    var _usedCarOffer = new UsedCarOffer();
    var offer = {
        used_car_id: "5a41e910286ed3803d1e68d2",
        merchant: "58aa89ffa66da14a3a8b4568",
        offer_type: "ercar",
        appraiser: "",
        offers: {
            price: _.random(100000, 150000),
            fee: 3000,
            expire_time: moment().add(30, 'days').format("YYYY-MM-DD")
        },
        description: "测试添加的报价" + moment().toDate().toDateString(),
    }
    offer.used_car_id = car_change_plan.used_car.used_car_id;
    offer.merchant = user.rights[0].mcid;
    offer.appraiser = user._id;
    return _usedCarOffer.saveMyOldCarOffer(offer)
}

function create_new_car_offer(car_change_plan, user) {
    var CarOffer = require('../modules/Module_web3/Module_CarOffer');
    var _carOffer = new CarOffer();
    var offer = {
        "car_change_plan_id": car_change_plan._id, //换车计划id
        "car_products_id": car_change_plan.new_car.car_products_id, //新车id
        "merchant": user.merchant, //商户id
        "price": _.random(120000, 200000), //车价
        "licence_service_fee": "500", //上牌费
        "finance_service_fee": "2000", //金融服务
        "allowance": "4000", //置换补贴
        "purchase_tax": "12560", //购置税
        "vehicle_tax": "400", //车船税
        "insurance": "900", //交强险
        "commercial_insurance": "5000", //商业保险
        "extra_fee": "12800", //精品套装
        "special": "3000", //赠送礼包
        "description": "", //备注信息
        "expire_time": moment().add(30, 'days').format("YYYY-MM-DD")
    };
    offer.appraiser = user._id;
    return _carOffer.saveCarOffer(offer);
}

