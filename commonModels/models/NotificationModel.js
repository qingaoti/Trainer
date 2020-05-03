var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
// var constant = require('../common/constant');

var NotificationSchema = new Schema(
    {
        linkID: String, //User._id
        // pushID: String, //ios 推送ID
        // deviceID: String, //android 推送ID
        iosPush: [{ //ios 推送ID
            _id: false,
            appID: {type: String},
            // appName: {type: String, enum: _.keys(constant.APP_LIST)},
            pushID: {type: String},
            createTime: {type: Date, default: Date.now},
            updateTime: {type: Date, default: Date.now}
        }],
        androidPush: [{ //android 推送ID
            _id: false,
            appID: {type: String},
            // appName: {type: String, enum: _.keys(constant.APP_LIST)},
            pushID: {type: String},
            createTime: {type: Date, default: Date.now},
            updateTime: {type: Date, default: Date.now}
        }],
        // deviceType: {type: String, enum: _.keys(constant.message_notification_deviceType)},//'service,ios,android,web'
        subscribe: {type: Boolean, default: false}, //订阅开关

        accept: {
            wechat: {type: Boolean, default: true}, //微信
            system: {type: Boolean, default: true}, //系统消息
            sms: {type: Boolean, default: true}, //短信
            app: {type: Boolean, default: true} //app推送
        }
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'create_time',
            updatedAt: 'update_time'
        }
    }
);

NotificationSchema.index({pushID: 1, deviceID: 1});
NotificationSchema.index({linkID: 1});
NotificationSchema.index({deviceType: 1});

module.exports = mongoose.model("Notification", NotificationSchema);