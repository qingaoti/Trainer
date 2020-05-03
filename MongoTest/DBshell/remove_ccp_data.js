var config = require("../../config");
var models = require('huanche-models')(config.MongoSettings);
var _ = require('lodash');
var Q = require("q");
var constant = require('huanche-models').tools;
var moment = require('moment');

function cleanAllweb3UserData() {
	var removeList = []; // 总共要删除的集合,
	var ccpList = ['CarOffer', 'CarChangePlanNew', 'UsedCar', 'UsedCarOffer']; // 业务线,换车计划相关的
	removeList = _.concat(removeList, ccpList); // 只需要添加业务线,到removeList 就行.  用时请注意, 选择对应的业务线
	try {
		removeList.forEach(function (item, index) {
			models[item].remove({}).then(function (rst) {
				console.log(item + "完成: 数量" + rst.result.n);
			});
		});
	} catch (e) {
		console.log(e);
	}
	console.log("删除完成");
}

function cleanUserDataByPhone() {
	var phones = ["15914197440"];
	var g_ccps = [];
	var g_ucars = [];
	var op_list = [];
	var g_uids = [];
	return models.User.find({ phone: { $in: phones } }).lean().then(function (urs) {
		var ids = _.map(urs, '_id');
		g_uids = ids;
		console.log("find user " + ids.length);
		//remove the car change plan
		op_list.push(models.CarChangePlanNew.remove({ owner: { $in: ids } }));
		return models.CarChangePlanNew.find({ owner: { $in: ids } }).lean().then(function (ccps) {
			console.log("find car change plans " + ccps.length);
			g_ccps = ccps;
			var used_cars = _.map(ccps, 'used_car.used_car_id');
			//remove the used car
			op_list.push(models.UsedCar.remove({ owner: { $in: g_uids } }));
			return models.UsedCar.find({ owner: { $in: g_uids } }).lean().exec()
		}).then(function (ucars) {
			console.log("find used car " + ucars.length);
			g_ucars = ucars;
			var uc_ids = _.map(ucars, '_id');
			//remove the used car offer
			op_list.push(models.UsedCarOffer.remove({ used_car_id: { $in: uc_ids } }));
			return models.UsedCarOffer.find({ used_car_id: { $in: uc_ids } }).lean().exec()
		}).then(function (uco) {
			console.log("find used car offer " + uco.length);
			var ccps_ids = _.map(g_ccps, '_id');
			// remove car offer
			op_list.push(models.CarOffer.remove({ car_change_plan_id: { $in: ccps_ids } }));
			return models.CarOffer.find({ car_change_plan_id: { $in: ccps_ids } }).lean().exec()
		}).then(function (co) {
			console.log("find car offer " + co.length);
			return Q.all(op_list)
		}).then(function (rst) {
			console.log(rst);
		})
	}).catch(function (err) {
		console.log(err);
	}).done(function (done) {
		console.log("done");
		process.exit();
	})
}


function main() {
	cleanUserDataByPhone();
}

main();