var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
    name: String,
    che300Id: Number,
    provId: Number,
    provName: String,
    zip: String,
    pinyin: String,
    areas: [String],//20180428 添加行政区域
    centerGd: {}, //190325 添加高德城市中心点坐标
    adminCode: String //190325 添加adminCode
}, {
    versionKey: false
});

CitySchema.index({provId: 1});
CitySchema.index({provName: 1});
CitySchema.index({name: 1});

module.exports = mongoose.model('City', CitySchema);