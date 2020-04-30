const config = require("../../config");
const models = require('../../commonModels')(config.MongoSettings);
const _ = require('lodash');
const Q = require("q");
const moment = require('moment');

const gen_count = 10;

main();

function main() {
    const g_cps = [];
    console.log(models);
    return models.City.create({
        name:"ceshi"
    },function (err,data) {
        console.log(data);
    });
}

