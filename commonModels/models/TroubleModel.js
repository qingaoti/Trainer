const mongoose = require('mongoose');

const TroubleSchema = new mongoose.Schema({
    troubleCode: String,   //故障编号
    handleStatus: String,  //处理状态
    troubleType: String,   //故障类型
    troubleLevel: String,  //故障级别
    troubleSource: String, //故障来源
    area: String,   //故障区域
    areaId: String,   //故障ID
    deviceName: String,    //设施名称
    deviceType: String,    // 设施类型
    deviceId : String,     //设施id
    equipment : [{ //设备对象
        equipmentId: {type: String},
        equipmentName: {type: String},
        equipmentType: {type: String}
    }],
    troubleDescribe : String, //故障描述
    reportUserId : String, //填报人id
    reportUserName : String, //填报人名称
    happenTime: Date, //发生时间
    deptId: String, //责任单位id
    deptName: String, //责任单位名称
    instanceId:String,  // 流程实例Id
    handleTime : Date, //处理时间
    currentHandleProgress : String, //当前处理流程进度
    dutyUserId : String,  // 当前处置人
    dutyUserName: String , //当前处置人名称
    troubleRemark : String, //故障备注
    tenantId: String, //多租户
    isDelete: Number, //是否删除
    createUser: String, //创建用户
    updateUser: String, //修改用户
    // ---------相关信息--------------//
    staff : [{     // 人员调配
        staffId: {type: String},    //人员ID
        staffName: {type: String},  //人员名称
        staffPosition: {type: String}  //人员的职位
    }],
    vehicle : [{    // 车辆调配
        vehicleId: {type: String},     //车辆ID
        vehicleName: {type: String},   //车辆名称
        numberPlate: {type: String}    //车牌
    }],
    asset : [{    // 资产调配
        assetId: {type: String},   //资产ID
        assetName: {type: String}, //资产名称
        assetCode: {type: String}  //资产编号
    }]
    // ---------相关信息--------------//
}, {
    versionKey: false,
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});

module.exports = mongoose.model('Trouble', TroubleSchema);