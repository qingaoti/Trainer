var  Q = require('q');
var fs = require('fs');

//封装promise
var readFile = function (fileName) {
    //     var deferred = Q.defer();
//     var _fields = _.extend({}, fields);
//     this.___model.findOne(criterion, _fields, deferred.makeNodeResolver());
//     return deferred.promise;

    var deferred = Q.defer();
    fs.readFile(fileName, function (err, data) {
        if (err) defer.reject(err);
       //  setTimeout(function(){
       //      deferred.resolve(data)
       // },1000);
    });
    return deferred.promise;
};

//队列执行
var queue = [];
queue.push("11111");
queue.push("2222");
queue.push("333");
Q.all(queue)
    .then(function(data){
        console.log("返回1",data[0].toString());
        console.log("返回2",data[1].toString());
        console.log("返回3",data[2].toString());
    },function(err){
        console.log(err);
    });
