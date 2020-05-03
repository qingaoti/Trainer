var config = require("../../config");
var models = require('huanche-models')(config.MongoSettings);
var constant = require("huanche-models").constant;
var tools = require("huanche-models").tools;
var _ = require("lodash");
var Q = require('q');

function main() {
    var qList = [];
    return models.TsignContract.aggregate([
        {
            $match:{
                'txtFields.scName':{$exists:true}
            }
        },
        {
            $lookup:{
                from: "tsigntemplates",
                localField: "templateId",
                foreignField: "_id",
                as: "template_docs"
            }
        },
        {
            $unwind: "$template_docs"
        },
        {
            $lookup:{
                from: "orders",
                localField: "planId",
                foreignField: "car_change_plan_mongo_id",
                as: "order_docs"
            }
        },
        {
            $unwind: "$order_docs"
        },
        {
            $match:{
                'template_docs.type':{$in:[
                        'merchant_new_month',
                        'merchant_new_bill',
                        'merchant_new_person',
                        'merchant_used_month',
                        'merchant_used_bill',
                        'merchant_used_person'
                    ]}
            }
        }
    ]).then(function (rst) {
    //     console.log(`mileage 是 String类型的 有 ${rst.length} 个`);
    //     rst.forEach(function (item, index) {
    //         item._doc.car_info.mileage = _.toNumber(item._doc.car_info.mileage);
    //         qList.push(models.UsedCar.update({_id: item._doc._id}, item));
    //     });
    //     return Q.all(qList);
    // }).then(function (rst) {
        console.log(`查询出 ${rst.length} 个`);
        rst.forEach(function (item, index) {
            var orderId = item.order_docs._id;
            var scName = item.txtFields.scName;
            var CTtype = getNewUsedType(item.template_docs.type);
            console.log("orderId= "+ orderId + "添加,专员名称<" + scName +">, 协议类型是"+":"+ CTtype);
            // item._doc.car_info.mileage = _.toNumber(item._doc.car_info.mileage);
            // qList.push(models.UsedCar.update({_id: item._doc._id}, item));
            if(CTtype === "newCar"){
                qList.push(models.Order.findOne({_id: orderId}).then(function (orderItem) {
                    orderItem.new_car_order.sc_name = scName;
                    return models.Order.update({_id: orderId},orderItem);
                }));
            }else if (CTtype === "usedCar"){
                qList.push(models.Order.findOne({_id: orderId}).then(function (orderItem) {
                    orderItem.used_car_order.sc_name = scName;
                    return models.Order.update({_id: orderId},orderItem);
                }));
            }
        });
        return Q.all(qList);
    }).then(function (rst) {
        console.log(`修改出 ${rst.length} 个`);
    }).catch(function (err) {
        console.log(err);
    }).done(function () {
        console.log('done');
        process.exit();
    });
}

function getNewUsedType(CTtype) {
    var type = "";
    if (_.includes([constant.contract_type.merchant_new_month,
        constant.contract_type.merchant_new_bill,
        constant.contract_type.merchant_new_person
    ], CTtype)) { //  新车回写order
        type = "newCar";
    } else if (_.includes([constant.contract_type.merchant_used_month,
        constant.contract_type.merchant_used_bill,
        constant.contract_type.merchant_used_person
    ], CTtype)) { //  旧车回写order
        type = "usedCar";
    }
    return type;
}

main();