var co = require('co');
var fs = require('fs');

var encode ={
    encodind:"utf-8"
}

/**
 *  1 .. 异步串行调用   ---不用流程控制的结果
 */
fs.readFile('test/one.txt', function (err, data) {
   if (err) throw err;
   console.log(data.toString());
});
//
//fs.readFile('test/two.txt', function (err, data) {
//    if (err) throw err;
//    setTimeout(function(){
//        console.log(data.toString());
//    },5000);
//});
//
//fs.readFile('test/three.txt', function (err, data) {
//    if (err) throw err;
//    console.log(data.toString());
//});

/**
 *  2.. 异步串行调用    --用了yield 的流程控制效果
 */
//var fs = require('fs');
//
//var readFile = function (fileName){
//    return new Promise(function (resolve, reject){
//        fs.readFile(fileName, function(error, data){
//            if (error) reject(error);
//            //console.log(data);
//            //console.log(fileName==='test/two.txt');
//            if(fileName==='test/two.txt'){
//                console.log('等待5秒');
//                setTimeout(function(){
//                    console.log('执行');
//                    resolve(data);
//                },5000);
//            }else{
//                resolve(data);
//            }
//        });
//    });
//};
//
//var gen = function* (){
//    var f1 = yield readFile('test/one.txt');
//    var f2 = yield readFile('test/two.txt');
//    var f3 = yield readFile('test/three.txt');
//    console.log(f1.toString());
//    console.log(f2.toString());
//    console.log(f3.toString());
//};
//
//function run(gen){
//    var g = gen();
//    function next(data){
//        var result = g.next(data);
//        if (result.done) return result.value;
//        result.value.then(function(data){
//            next(data);
//        });
//    }
//    next();
//}
//run(gen);

/**
 *  3.. 异步串行调用    --用了co  +  yield 的流程控制效果
 */
//var fs = require('fs');
//
//var readFile = function (fileName){
//    return new Promise(function (resolve, reject){
//        fs.readFile(fileName, function(error, data){
//            if (error) reject(error);
//            //console.log(data);
//            //console.log(fileName==='test/two.txt');
//            if(fileName==='test/two.txt'){
//                console.log('等待5秒');
//                setTimeout(function(){
//                    console.log('执行');
//                    resolve(data);
//                },5000);
//            }else{
//                resolve(data);
//            }
//        });
//    });
//};
//
////主线流程
//var  genReadFile = function * () {
//    try{
//        var f1 = yield readFile('test/one.txt');
//        console.log(f1.toString());
//        var f2 = yield readFile('test/two.txt');
//        console.log(f2.toString());
//        var f3 = yield readFile('test/three.txt');
//        console.log(f3.toString());
//        return f3;
//    }catch(err){
//
//    }
//};
//
//var co = require('co');
//co(genReadFile).then(function (data){
//    console.log('Generator 函数执行完成，返回的是：'+data);
//});

// 数组的写法
//co(function* () {
//    var res = yield [
//        Promise.resolve(1),
//        Promise.resolve(2)
//    ];
//    console.log(res);
//}).catch(function(err,data){
//    console.log(err);
//    console.log(data);
//});

//// 对象的写法
//co(function* () {
//    var res = yield {
//        1: Promise.resolve(1),
//        2: Promise.resolve(2),
//    };
//    console.log(res);
//}).catch(function(err,data){
//    console.log(err);
//    console.log(data);
//});

/**
 *  4.. 异步串行调用    --用 ES6  特性 Promise + then
 */
// Promise.prototype.finally = function(fn) {
//    function finFn(valueORreason){
//        fn.call(null)
//    }
//    this.then(finFn, finFn);
//    return this
// }
//
//var str = ['test/one.txt','test/two.txt','test/three.txt'];
//var fs = require('fs');
//
//var readFile = function (fileName){
//    return new Promise(function (resolve, reject){
//        fs.readFile(fileName, function(error, data){
//            if (error) reject(error);
//            if(fileName==='test/two.txt'){
//                console.log('等待5秒');
//                setTimeout(function(){
//                    console.log('执行');
//                    resolve(data);
//                },5000);
//            }else{
//                resolve(data);
//            }
//        });
//    });
//};
//
//readFile(str[0]).then(function(data){
//    console.log(data.toString());
//    //throw  '测试异常！';
//    return readFile(str[1]);
//}).then(function(data){
//    console.log(data.toString());
//    return readFile(str[2]);
//}).then(function(data){
//    console.log( '函数执行完成，返回的是：'+data.toString());
//}).catch(function(data,err){
//    console.log( '异常'+ data);
//}).finally(function(){
//    console.log('写log ;');
//});


/**
 *  5.. 异步串行调用    --用 Q 封装异步流程
 */
var fs = require('fs');
var Q = require('q');

// var test = function (20) {
//     var defer = Q.defer();
//     if(20 > 0){
//         defer.resolve();
//     }
// }

var test = function (num) {

    if(num>10){
       return Q(true);
    }else {
       return Q(false);
    }
};

// test(1).then(function (flag) {
//     console.log("*****");
//     console.log(flag);
// });

//封装promise
var readFile = function (fileName) {
    //console.log('1111'+this.method);
    var defer = Q.defer();
    fs.readFile(fileName, function (err, data) {
        if (err) defer.reject(err);
        defer.done(data);
        // if(fileName==='test/two.txt'){
        //     console.log('等待5秒');
        //     setTimeout(function(){
        //         console.log('执行');
        //         defer.resolve(data);
        //     },5000);
        // }else{
        //     defer.resolve(data);
        // }
    });
    return defer.promise;
};


//cps
//var cpsReadFile = function(fileName){
//    return Q.nfcall(fs.readFile,fileName,'utf-8');
//};
//基本读取
//  return readFile("test/one.txt").then(function(data){
//         console.log(data.toString());
//         if(data){
//             return Promise.reject('data有值');
//         }
//         return readFile("test/two.txt");
//     })
//     .then(function(data){
//         console.log(data.toString());
//         //throw '错误';
//         return readFile("test/three.txt");
//     })
//     .then(function(data){
//         console.log(data.toString());
//     })
//     .fail(function(err){
//         console.log('then，fail message：'+err);
//     });

//采用done读取
readFile("test/one.txt")
   .then(function(data){
       new promise.d
       console.log(data.toString());
       return readFile("test/two.txt");
   })
   .then(function(data){
       // throw  '发生错误！';
       console.log(data.toString());
       return readFile("test/three.txt");
   })
   .done(function(data){
       console.log("上面");
       console.log(data.toString());
   },function(err){
       console.log("下面");
       console.log(err);
   });


//队列执行
var queue = [];
queue.push(readFile("test/one.txt"));
queue.push(readFile("test/two.txt"));
queue.push(readFile("test/three.txt"));
Q.all(queue)
   .then(function(data){
       console.log("返回1",data[0].toString());
       console.log("返回2",data[1].toString());
       console.log("返回3",data[2].toString());
   },function(err){
       console.log(err);
});
//
////遵循cps的函数 可以使用Q.nfcall nfapply变成promise
//Q.nfcall(fs.readFile,"text01",'utf-8')
//    .then(function (data) {
//        console.log("text01", data);
//        return   Q.nfcall(fs.readFile,"text02",'utf-8')
//    })
//    .then(function (data) {
//        console.log("text02", data);
//    },function(err){
//        console.log(err);
//});

