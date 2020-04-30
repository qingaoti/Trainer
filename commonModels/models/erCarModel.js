/**
 * Created by gtqin on 16-11-16.
 * 二手车相关属性
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
// var constant = require('../common/constant');

var erCarSchema = new mongoose.Schema({
    mct_id: {type: Schema.Types.ObjectId, required: true, ref: 'Merchant'}, //  FK  >> merchants  _id  商户id
    mct_name: {type: String, required: true},   // 冗余 商户名称
    mct_sname: {type: String, required: true},   // 冗余 商户缩写
    create_by: {type: Schema.Types.ObjectId, required: true, ref: 'User'},  // 创建的用户
    update_by: {type: Schema.Types.ObjectId, ref: 'User'},  // 修改的用户
    img: {
        front_45: {type: String, required: true},    //左前方45度
        rear_45: {type: String, required: true},      //右后方45度
        front_row: {type: String, required: true},    //前排
        center: {type: String, required: true},       //中控
        front: {type: String, required: true},        //正前方
        rear: {type: String, required: true},        //正后方
        engine: {type: String, required: true},      //发动机仓
        trunk: {type: String, required: true},        //后备箱
        other: [
            {
                _id: false,
                name: {type: String},
                url: {type: String}
            }
        ]
    },
    model_name: {type: String},  // 名字
    model_id: {type: String}, //型号id， 如果自己填为空
    series_name: {type: String}, //车系名
    series_id: {type: String}, //车系id
    brand_name: {type: String}, //品牌名
    brand_id: {type: String}, //品牌id
    date_reg: {type: Date, required: true}, //上牌时间
    date_annual_check: {type: Date}, // 年检到期时间
    date_insurance: {type: Date}, // 强险到期时间
    date_business: {type: Date}, // 商险到期时间
    city_id: {type: String, required: true}, // 城市id
    city_name: {type: String, required: true}, //城市名称
    prov_id: {type: String, required: true}, // 省id
    prov_name: {type: String, required: true}, // 省名称
    colour: {type: String, required: true}, // 颜色
    gearbox: {type: String, required: true}, // 变速箱类型
    size: {type: Number, required: true, min: 0, max: 99}, // 排量
    turbo: {type: Boolean, default: false}, // 涡轮增压
    mileage: {type: Number, required: true, min: 0, max: 9999999}, // 行驶里程, 单位公里
    memo: {type: String, required: true}, // 描述
    vin_no: {type: String}, // 车架号
    transfer_times: {type: Number, required: true}, // 过户次数
    price_net: {type: Number}, // 评估价格
    price_merchant: {type: Number, required: true, min: 0}, // 商户销售价格
    price_done: {type: Number},  // 最后成交价
    // tst_type: {type: String, enum: _.keys(constant.ercar_tst_type)}, // 平台车源 ,异页
    red_enabled: {type: Boolean, default: false}, // 红包可用不可用,用来判断是否要发钱
    red_mctVal: {type: Number, default: 0},  // 红包的商户促成金额
    red_ctmVal: {type: Number, default: 0},  // 红包的客户促成金额
    red_tstVal: {type: Number, default: 0},  // 红包的传播总额
    red_tstCount: {type: Number, default: 0},  // 传播红包的数量
    // coupon_car_id: {type: Schema.Types.ObjectId, ref: 'CouponCar'},   // 关联红包的
    loc: {type: [Number]},          // 活动所属商户的地理坐标，从merchant表冗余过来
    // status: {type: String, enum: _.keys(constant.car_status)}  //  流程状态:  已下架   审核中  在售  已售  删除
    /**
     * 伪字段
     *
     red_cost : {type: Number}   传播红包退还的费用
     red_tstUsable : {type: Number}   传播红包 还剩余的数量
     sign_count : {type: Number}  报名人数
     forward_count : {type: Number}   转发次数
     forward_status: {type: Boolean} 是否转发
     */
}, {
    versionKey: false,
    timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}
});

erCarSchema.index({mct_id: 1});
erCarSchema.index({create_by: 1});
erCarSchema.index({status: 1});
erCarSchema.index({tst_type: 1});
erCarSchema.index({loc: '2dsphere'});

module.exports = mongoose.model('erCar', erCarSchema);
