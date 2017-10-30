var koa = require('koa');
var app = koa();

// x-response-time

app.use(function *(next){
    var start = new Date;
    console.log('this one');
    yield next;
    console.log('this one next');
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger
app.use(function *(next){
    var start = new Date;
    console.log('this two');
    yield next;
    console.log('this two next');
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
    this.body = 'Hello World';
    console.log('this over');
});

console.log("测试执行顺序");
app.listen(3000);

/**
 *
 * 输出结果
 this one
 this two
 this over
 this two next
 GET / - 7
 this one next
 *
 *
 */


