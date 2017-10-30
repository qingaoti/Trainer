/*
 需要理解
 generator 的定义和函数类似，只是在 function 后面多了一个*
 调用generator 和调用函数一样，只是不像函数立即执行，而是会生成一个对象
 generator 生成的对象存在一个 next 函数，调用 next 会返回 yield运算的结果对象，并停止。再次调用会在下一个 yield 处停止。
 当所有的 yield 被执行完，调用 next 函数会返回{ value: undefined, done: true }。再次调用会报错

 function* Gene(){
 yield 1;
 yield 2;
 }
 var gene = Gene();
 console.log(gene.next());//{ value: 1, done: false }
 console.log(gene.next());//{ value: 2, done: false }
 console.log(gene.next());//{ value: undefined, done: true }
 console.log(gene.next());//Error: Generator has already finished  经@Ralph-Wang提醒从 v0.11.13 开始不抛错了，返回{ value: undefined, done: true }
 */

/**
 看完 generator 的介绍，你心里回想这跟异步有毛关系？不着急听我接着说
 串行请求两个网页的代码
 */

//var request = require('request');
//var a = {};
//var b = {};
//console.log("开始");
//request('http://www.baidu.com', function (error, response, body) {
//    console.log("level 1 开始");
//    if (!error && response.statusCode == 200) {
//        a.response = response;
//        a.body = body;
//        console.log("level 1 成功  level2 开始");
//        request('http://www.hao123111.com', function (error, response, body) {
//            if (!error && response.statusCode == 200) {
//                b.response = response;
//                b.body = body;
//                console.log("level 2 成功" );
//            }
//        });
//    }
//});

co(function *(){
    var a = yield request('http://www.baidu.com');
    var b = yield request('http://www.hao123111.com');
    console.log(a[0].statusCode);
    console.log(b[0].statusCode);
})()


function co(Gene){
    //先实例化一下
    var gene = Gene();
    //如果存在 next 函数
    if(gene.next){
        var fun = gene.next();//把异步函数返回过来，好继续封装
        //fun 处理完，再调用 gene.next()
        //...
    }
}