const config = require("../../config");
const models = require('../../commonModels')(config.MongoSettings);
const _ = require('lodash');
const Q = require("q");
const moment = require('moment');

const gen_Num = 10000000; // 要循环的次数值

main().then(r => console.log("main done"));

async function main () {
    let startTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log("开始时间："+ startTime);
    let runNum = 10000;  //循环一次最多次数；
    let runCount = gen_Num / runNum ;  // 总数量/跑的一次最多的数量  = while分批的数量

    let i = 0;
    while ( i < runCount){
        let qList = [];

        let count = i * runNum;
        let gen_count = runNum + count;

        for (count ; count < gen_count; count++) {
            let obj = getRandomTrouble(count);
            qList.push(obj);
        }
        await models.Trouble.create(qList);
        console.log("执行第"+i+"次 done，时间："+ moment().format('YYYY-MM-DD HH:mm:ss'));
        qList = null;
        i++;
    }
    console.log("all done");
    let entTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log("结束时间："+ entTime);
    console.log("总耗时："+ (moment(startTime,'YYYY-MM-DD HH:mm:ss').diff() / 1000).toFixed(0) + "S");
    process.exit();
}

function getRandomTrouble(gen_count) {
    const baseTrouble = {
        trouble_code: "WH-TC",   //故障编号
        handle_status: "",  //处理状态
        trouble_type: "",   //故障类型
        trouble_level: "",  //故障级别
        trouble_source: "", //故障来源
        trouble_area: "华中",   //故障区域
        device_name: "设施",    //设施名称
        device_id : "",     //设施id
        equipment_name: "设备",    //设备名称
        equipment_id : "",     //设备id
        trouble_describe : "发生故障的描述", //故障描述
        report_user_id : "", //填报人id
        report_user_name : "", //填报人名称
        happen_time: "", //发生时间
        duty_dept_id: "", //责任单位id
        duty_dept_name: "", //责任单位名称
        handle_time : "", //处理时间
        current_handle_progress : "", //当前处理流程进度
        trouble_remark : "备注", //故障备注
        is_delete: 0, //是否删除
        create_user: "", //创建用户
        update_user: "", //修改用户
    };
    const handle_status_list = ["未提交","已提交","处理中","已完成","已打回"];
    const trouble_type_list = ["通信故障","业务质量故障","环境故障","电力故障","安全故障","设备故障"];
    const trouble_level_list = [1,2,3,4];
    const trouble_source_list =["app报修","告警诊断","投诉"];
    const trouble_area_list = ["华中","华南","华北","华西","华东"];
    const people_list = [
        {
            report_user_id:"abc123",
            report_user_name:"张三",
            duty_dept_id:"dp0101",
            duty_dept_name:"开发部",
            create_user:"信息员01",
        },{
            report_user_id:"abc456",
            report_user_name:"李四",
            duty_dept_id:"dp0102",
            duty_dept_name:"技术部",
            create_user:"信息员02",
        },{
            report_user_id:"abc789",
            report_user_name:"王五",
            duty_dept_id:"dp0102",
            duty_dept_name:"技术部",
            create_user:"信息员02",
        }
    ];
    const device_list = [
        {
            device_name:"设施01",
            device_id:"SS",
            equipment_name:"设备01",
            equipment_id:"SB"
        },
        {
            device_name:"设施02",
            device_id:"SS",
            equipment_name:"设备02",
            equipment_id:"SB"
        },
        {
            device_name:"设施03",
            device_id:"SS",
            equipment_name:"设备03",
            equipment_id:"SB"
        }
    ];

    let obj = _.cloneDeep(baseTrouble);
    obj.handle_status = handle_status_list[_.random(0, handle_status_list.length - 1)];
    obj.trouble_type = trouble_type_list[_.random(0, trouble_type_list.length - 1)];
    obj.trouble_level = trouble_level_list[_.random(0, trouble_level_list.length - 1)];
    obj.trouble_source = trouble_source_list[_.random(0, trouble_source_list.length - 1)];
    obj.trouble_area = trouble_area_list[_.random(0, trouble_area_list.length - 1)];
    let people = people_list[_.random(0, people_list.length - 1)];
    let device = device_list[_.random(0, device_list.length - 1)];
    obj = _.extend(obj,people,device);
    obj.trouble_code = obj.trouble_code + gen_count ;
    obj.device_id = obj.device_id + _.random(0,1000,false);
    obj.equipment_id = obj.equipment_id + _.random(0,1000,false);
    obj.happen_time = moment().format('YYYY-MM-DD HH:mm:ss');
    return obj;
}