const _ = require('lodash');

const List = [
    {'name': 'a', 'level': 1},
    {'name': 'b', 'level': 2},
    {'name': 'c', 'level': 3},
    {'name': 'b', 'level': 4}
];

const strList = ["a","b","c","d"];

let dataList = ["b", "a", "c", "d", "a", "c", "b"];

dataList.sort(function (a,b) {
    var convertA = _.indexOf(strList,a);
    var convertB = _.indexOf(strList,b);

    return convertB - convertA;
});

console.log(dataList);

// console.log(_.orderBy(dataList, List., 'asc'));