module.exports = models = function (config) {
    var mongoose = require("mongoose");
    var models = {};

    var gconfig = {};
    if (config) {
        gconfig = config;
    } else {
        gconfig = require("../config.js").MongoSettings;
    }

    if (!mongoose.connection.readyState == 1) {
        mongoose.connect(gconfig.mongodb, gconfig.options, function (err) {
            if (err) {
                console.error('connect to mongo server error: ' + gconfig.mongodb + err.message);
                process.exit(1);
            }
        });

        mongoose.Promise = require("q").Promise;

        mongoose.connection.on('disconnected', function (err) {
            console.error('Database disconnected');
            console.info('Exit process');
            process.exit(1);
        });

        mongoose.connection.on('error', function (err) {
            console.error('Database disconnected');
            console.info('Exit process');
            process.exit(1);
        });

        process.on('SIGINT', function (err) {
            console.warn('app exit');
            if (mongoose.connection.readyState === 1) {
                mongoose.connection.close();
            } else {
                process.exit(0);
            }
        });
    }

    require('./CityModel.js');
    require('./erCarModel.js');
    require('./MessageModel.js');
    require('./NotificationModel.js');

    models.City = mongoose.model('City');
    models.Message = mongoose.model('Message');
    models.Notification = mongoose.model("Notification");
    models.erCar = mongoose.model("erCar");

    models.middleware = function (req, res, next) {
        req.models = models;
        next();
    };

    models.mongoose = mongoose;

    return models;
};
