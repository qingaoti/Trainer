var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var constant = require('../common/constant');
var _ = require("lodash");

var MessageSchema = new mongoose.Schema({
        sender_id: {type: String},
        target_id: {type: String},
        phone: {type: String},

        smart: {type: Boolean, default: true},
        // message_type: {type: String, enum: _.keys(constant.message_type)}, //消息类型
        // channel: [{type: String, enum: _.keys(constant.message_channel)}],//消息渠道

        content: {type: Schema.Types.Mixed}, //消息内容
        result: {type: Schema.Types.Mixed}, //消息发送结果
        error: {type: Schema.Types.Mixed},  //消息发送失败时，记录错误信息

        // status: {type: String, enum: _.keys(constant.message_status), default: constant.message_status.created},
        is_read: {type: Boolean, default: false},

        feedback: {type: String},

        send_time: {type: Date},    // 发送时间
        expiration: {type: Date},   // 延迟消息过期时间，该时间点触发发送

        message_point_no: {type: String},  // 记录发送消息的messagePoint
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'create_time',
            updatedAt: 'update_time'
        }
    }
);

MessageSchema.index({target_id: 1});
MessageSchema.index({phone: 1});

module.exports = mongoose.model('Message', MessageSchema);