const mongoose = require('mongoose');

const TroubleSchema = new mongoose.Schema({
    trouble_code: String,   //故障编号
    handle_status: String,  //处理状态
    trouble_type: String,   //故障类型
    trouble_level: String,  //故障级别
    trouble_source: String, //故障来源
    trouble_area: String,   //故障区域
    device_name: String,    //设施名称
    device_id : String,     //设施id
    equipment_name: String,    //设备名称
    equipment_id : String,     //设备id
    trouble_describe : String, //故障描述
    report_user_id : String, //填报人id
    report_user_name : String, //填报人名称
    happen_time: Date, //发生时间
    duty_dept_id: String, //责任单位id
    duty_dept_name: String, //责任单位名称
    handle_time : Date, //处理时间
    current_handle_progress : String, //当前处理流程进度
    trouble_remark : String, //故障备注
    is_delete: Number, //是否删除
    create_user: String, //创建用户
    update_user: String, //修改用户
}, {
    versionKey: false,
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});

module.exports = mongoose.model('Trouble', TroubleSchema);