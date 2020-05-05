/**
 * Created by gtqin on 20-5-4.
 * 工单相关属性
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
// var constant = require('../common/constant');

var procInspectionSchema = new mongoose.Schema({
    proc_id: {type: String, required: true},   // 工单id
    status: {type: String, required: true},   // 状态
    inspection_area_id: {type: String},   // 巡检区域id
    inspection_area_name: {type: String},  // 巡检区域名称
    inspection_task_id: {type: String}, //巡检任务id
    inspection_start_time: {type: Number, required: true},  //巡检开始时间
    inspection_end_time: {type: Number, required:true}, //巡检结束时间
    inspection_device_count: {type:Number, required:true}, //巡检设施总数
    inspection_completed_count: {type:Number, required:true}, //巡检完成设施
    accountability_dept: {type:String, required:true}, //部门信息
    accountability_dept_name: {type:String, required:true}, //关联部门信息
    proc_type: {type:String, required:true}, //工单类型
    title: {type:String, required:true}, //标题
    assign: {type:String}, //责任人
    dept_type: {type:String, required:true}, //单位类型 0 人 1 部门
    single_back_reason: {type:String},  //退单原因 (0、其他；1、误报)
    single_back_user_defined_reason: {type:String},  //自定义退单原因
    expected_completed_time: {type:Number, required:true},  //期望完工时间
    reality_completed_time: {type:Number, required:true},  //实际完工时间
    remark: {type:String},  //备注
    proc_resource_type: {type:String, required:true},  //工单来源 1 手动新增  2 巡检任务新增 3 告警新增 4 故障新增
    turn_reason: {type:String},  //转办原因
    is_told: {type:String},  //工单超时是否已经通知   0未通知 1 已通知
    is_check_single_back: {type:String, required:true},  //确认退单  0 未确认 1 已确认
    is_create_alarm: {type:String, required:true},  //是否创建告警 0 未创建  1 已创建
    regenerate_id: {type:String},  //重新生成工单id（已重新生成工单，会有新工单id）
    proc_related_devices: [
        {
            device_id: {type: String, required: true},    //设施id
            device_type: {type: String, required: true}, //设施类型
            device_area_id: {type: String}, //设施区域id
            device_name: {type: String, required: true}, //设施名称
            device_area_name: {type: String}, //设施区域名称
            is_normal: {type: String, required: false}, //设施是否正常  1 正常 0 不正常
            error_info: {type: String, required: false}, //故障信息
            error_reason: {type: String, required: false}, //故障原因
            repair_advice: {type: String, required: false}, //维修建议
            remark: {type: String, required: false}, //备注
        }
    ],  //关联设施
    proc_related_equipment: [
        {
            device_id: {type: String, required: true},    //设施id
            equipment_id: {type: String, required: true},    //设备id
            equipment_type: {type: String, required: true}, //设备类型
            equipment_name: {type: String, required: true}, //设备名称
            is_normal: {type: String, required: false}, //设施是否正常  1 正常 0 不正常
            error_info: {type: String, required: false}, //故障信息
            error_reason: {type: String, required: false}, //故障原因
            repair_advice: {type: String, required: false}, //维修建议
            remark: {type: String, required: false}, //备注
        }
    ],  //关联设备
    is_deleted: {type:String, required:true},  //是否删除 0 未删除 1 已删除
    create_user: {type:String, required:true},  //创建人
    create_time: {type:String, required:true},  //创建时间
    update_user: {type:String, required:false},  //修改人
    update_time: {type:String, required:false},  //修改时间
});
module.exports = mongoose.model('Proc', procInspectionSchema);
