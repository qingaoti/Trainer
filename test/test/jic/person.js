/**
 人类
 */

var util = require('util');

function person() {

}

person.prototype.sayHello = function() {
    console.log('Hello ' + this.name);
    return 'xx';
};

person.prototype.eat = function () {
    console.log(this.name + 'eat something');
};

module.exports = person;