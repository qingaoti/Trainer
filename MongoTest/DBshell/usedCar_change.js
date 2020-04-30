var config = require("../../config");
var models = require('huanche-models')(config.MongoSettings);
var constant = require("huanche-models").constant;
var tools = require("huanche-models").tools;
var _ = require("lodash");
var Q = require('q');

function main() {
    var qList = [];
    return models.UsedCar.find({"car_info.mileage": {$type: 2}}).then(function (rst) {
        console.log(`mileage 是 String类型的 有 ${rst.length} 个`);
        rst.forEach(function (item, index) {
            item._doc.car_info.mileage = _.toNumber(item._doc.car_info.mileage);
            qList.push(models.UsedCar.update({_id: item._doc._id}, item));
        });
        return Q.all(qList);
    }).then(function (rst) {
        console.log(`ok ${rst.length} 个`);
    }).catch(function (err) {
        console.log(err);
    }).done(function () {
        console.log('done');
        process.exit();
    });
}

main();