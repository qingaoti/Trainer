/**
 爸爸
 */

var util = require('util');
var person = require('./person');

function foo() {
    
    // this.name = "父亲";
    // this.age = 30;
    // this.book = "有个房子";
    //
    // this.house = {
    //     "name":"大房子"
    // };
    //
    // function work() {
    //     console.log("我要上班!")
    // }
}



util.inherits(foo,person);

module.exports = foo;