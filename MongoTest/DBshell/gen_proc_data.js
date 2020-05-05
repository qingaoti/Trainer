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
    let runNum = 5000;  //循环一次最多次数；
    let runCount = gen_Num / runNum ;  // 总数量/跑的一次最多的数量  = while分批的数量

    let i = 0;
    while ( i < runCount){
        let qList = [];

        let count = i * runNum;
        let gen_count = runNum + count;

        for (count ; count < gen_count; count++) {
            let obj = getRandomProc(count);
            qList.push(obj);
        }
        await models.Proc.create(qList);
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

function getRandomProc(gen_count) {
    const baseProc = {
        proc_id: "",   // 工单id
        inspection_area_id: "",   // 巡检区域id
        inspection_area_name: "",  // 巡检区域名称
        inspection_task_id: "asdfsds112121213", //巡检任务id
        inspection_start_time: 1588581420272,  //巡检开始时间
        inspection_end_time: 1588581420272, //巡检结束时间
        inspection_device_count: 10, //巡检设施总数
        inspection_completed_count: 10, //巡检完成设施
        accountability_dept: "", //部门信息
        accountability_dept_name: "", //关联部门信息
        status: "", //状态
        proc_type: "inspection", //工单类型
        title: "巡检工单", //标题
        assign: "", //责任人
        dept_type: "0", //单位类型 0 人 1 部门
        single_back_reason: "0",  //退单原因 (0、其他；1、误报)
        single_back_user_defined_reason: "",  //自定义退单原因
        expected_completed_time: 1588581420272,  //期望完工时间
        reality_completed_time: 1588581420272,  //实际完工时间
        remark: "",  //备注
        proc_resource_type: "1",  //工单来源 1 手动新增  2 巡检任务新增 3 告警新增 4 故障新增
        turn_reason: "",  //转办原因
        is_told: "0",  //工单超时是否已经通知   0未通知 1 已通知
        is_check_single_back: "0",  //确认退单  0 未确认 1 已确认
        is_create_alarm: "0",  //是否创建告警 0 未创建  1 已创建
        regenerate_id: "",  //重新生成工单id（已重新生成工单，会有新工单id）
        proc_related_devices: [],  //关联设施
        proc_related_equipment: [],  //关联设备
        is_deleted: "0",  //是否删除 0 未删除 1 已删除
        create_user: "admin",  //创建人
        create_time: 1588581420272,  //创建时间
        update_user: "admin",  //修改人
        update_time: 1588581420272,  //修改时间
    };
    //工单状态
    const handle_status_list = ["assigned","pending","processing","completed","singleBack","turnProcessing"];

    //设施类型
    const device_type_list = ["001", '002', '003', '004'];

    //区域信息
    const area_list = [
        {
            area_id:"1",
            area_name:"汉口",
        },
        {
            area_id:"2",
            area_name:"青山",
        },
        {
            area_id:"3",
            area_name:"武昌",
        },
        {
            area_id:"4",
            area_name:"汉阳",
        }

    ];

   //部门信息
    const department_list = [
        {
            dept_id:"1",
            dept_name:"营销部",
        },
        {
            dept_id:"2",
            dept_name:"开发部",
        },
        {
            dept_id:"3",
            dept_name:"推广部",
        }
    ];

    //关联设施
    const device_list = [
        {
            device_name:"设施01",
            device_id:"1",
            device_type: "001",
            device_area_id:"1",
            device_area_name:"汉口"
        },
        {
            device_name:"设施02",
            device_id:"2",
            device_type: "001",
            device_area_id:"1",
            device_area_name:"汉口",
        },
        {
            device_name:"设施03",
            device_id:"3",
            device_type: "001",
            device_area_id:"1",
            device_area_name:"汉口",
        }
        ,
        {
            device_name:"设施04",
            device_id:"4",
            device_type: "002",
            device_area_id:"2",
            device_area_name:"青山",
        }
        ,
        {
            device_name:"设施05",
            device_id:"5",
            device_type: "002",
            device_area_id:"2",
            device_area_name:"青山",
        }
        ,
        {
            device_name:"设施06",
            device_id:"6",
            device_type: "002",
            device_area_id:"2",
            device_area_name:"青山",
        }
        ,
        {
            device_name:"设施07",
            device_id:"7",
            device_type: "003",
            device_area_id:"3",
            device_area_name:"武昌",
        },
        {
            device_name:"设施08",
            device_id:"8",
            device_type: "003",
            device_area_id:"3",
            device_area_name:"武昌",
        },
        {
            device_name:"设施09",
            device_id:"9",
            device_type: "003",
            device_area_id:"3",
            device_area_name:"武昌",
        },
        {
            device_name:"设施10",
            device_id:"10",
            device_type: "004",
            device_area_id:"4",
            device_area_name:"汉阳",
        },
        {
            device_name:"设施11",
            device_id:"11",
            device_type: "004",
            device_area_id:"4",
            device_area_name:"汉阳",
        },
        {
            device_name:"设施12",
            device_id:"12",
            device_type: "004",
            device_area_id:"4",
            device_area_name:"汉阳",
        }
    ];


    //关联设备
    const equipment_list = [
        {
            device_id:"1",
            equipment_id: "001",
            equipment_type:"1",
            equipment_name:"设备1"
        },
        {
            device_id:"2",
            equipment_id: "002",
            equipment_type:"1",
            equipment_name:"设备2"
        },
        {
            device_id:"3",
            equipment_id: "003",
            equipment_type:"1",
            equipment_name:"设备3"
        }
        ,
        {
            device_id:"4",
            equipment_id: "004",
            equipment_type:"1",
            equipment_name:"设备4"
        }
        ,
        {
            device_id:"5",
            equipment_id: "005",
            equipment_type:"2",
            equipment_name:"设备5"
        }
        ,
        {
            device_id:"6",
            equipment_id: "006",
            equipment_type:"2",
            equipment_name:"设备6"
        }
        ,
        {
            device_id:"7",
            equipment_id: "007",
            equipment_type:"2",
            equipment_name:"设备7"
        },
        {
            device_id:"8",
            equipment_id: "008",
            equipment_type:"2",
            equipment_name:"设备8"
        },
        {
            device_id:"9",
            equipment_id: "009",
            equipment_type:"3",
            equipment_name:"设备9"
        },
        {
            device_id:"10",
            equipment_id: "010",
            equipment_type:"3",
            equipment_name:"设备10"
        },
        {
            device_id:"11",
            equipment_id: "011",
            equipment_type:"3",
            equipment_name:"设备11"
        },
        {
            device_id:"12",
            equipment_id: "012",
            equipment_type:"3",
            equipment_name:"设备12"
        }
    ];

    let obj = _.cloneDeep(baseProc);
    //工单状态
    obj.status = handle_status_list[_.random(0, handle_status_list.length - 1)];
    //区域信息
    let info = area_list[_.random(0, area_list.length - 1)];
    obj.area_id = info.area_id;
    obj.area_name = info.area_name;
    //设施类型
    obj.device_type = device_type_list[_.random(0, device_type_list.length - 1)];
    //部门信息
    let dept = department_list[_.random(0, department_list.length - 1)];
    obj.accountability_dept = dept.dept_id;
    obj.accountability_dept_name = dept.dept_name;
    //工单关联设施
    obj.proc_related_devices = device_list;
    //工单关联设备
    obj.proc_related_equipment = equipment_list;
    //工单名称
    obj.title = obj.title + gen_count ;
    //工单id
    obj.proc_id = gen_count;
    return obj;
}