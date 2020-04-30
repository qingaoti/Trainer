module.exports = models = function (config) {

    var models = require('./models');
    var model = new models(config);
    return model;
};

// models.constant = require('./common/constant.js');


