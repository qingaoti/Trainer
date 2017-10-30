/**
 * Created by chenlizan on 16-5-30.
 */
"use strict";
var co = require('co');
console.log('——————Generator example——————');
function* helloWorldGenerator() {
    yield function () {
        console.log('hi');
    };
    yield function* () {
        yield 'hello';
    };
    yield 'world';
    return 'ending';
}
var first = helloWorldGenerator();
(first.next().value)();
console.log((first.next().value)().next().value);
var [first1,hello,world] = helloWorldGenerator();
(first1)();
console.log((hello)().next().value);
var [hello1] = hello();
console.log(hello1);
console.log(world);
var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        }
        else {
            yield item;
        }
    }
};
for (var f of flat(arr)) {
    console.log(f);
}
co(first);