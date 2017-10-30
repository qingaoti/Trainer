var koa = require('koa');
var app = koa();
app.keys = ['im a newer secret', 'i like turtle'];
app.use(function * () {
    //this.throw(404, 'name required');
    var controller = this.request.path;
    if (controller == "/test/" || controller == "/test") {
        //返回的是自动的变成  Content-Type:application/json; charset=utf-8
        this.body = {
            test: "ok"
        }
    } else if (controller == "/index" || controller == "/index/") {
        //throw ('demo');
        //参数自动得到  http://localhost:3000/index?dd=123&ee=321
        //返回的是自动的变成  Content-Type:text/plain; charset=utf-8
        this.body = 'Hello World111';
        console.log('得到的参数：'+this.request.query.dd);
        /**
         * this == koa 的 Context
         * 必须清楚参数，方便前端和后端通讯
         */
        //console.log(this);
    } else {
        this.throw(404, '当前内容并未找到~');
    }
    console.log(this.request.path);
});

console.log('koa 启动开始');
app.listen(3000);