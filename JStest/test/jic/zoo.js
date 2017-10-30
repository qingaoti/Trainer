/**
 儿子
 */

var util = require('util');
var foo = require('./foo');

function zoo() {
}

util.inherits(zoo,foo);

module.exports = zoo;