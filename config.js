module.exports = {
    //邮件配置
    email: {
        service: 'QQ',
        user: 'qingaoti@qq.com',
        pass: 'guxblzkyjrlrbhfb',
    },
    // 数据库配置
    MongoSettings: {
        mongodb: "mongodb://10.5.24.141:27017/demo",
        options: {
            keepAlive: 1,
            //socketTimeoutMS: 5000,
            //connectTimeoutMS: 5000
            poolSize: 10,
            promiseLibrary: require('q').Promise
        }
    },
    // es配置
    ElasticsearchSettings: {
        // hosts: [
        //     'http://172.16.200.171:9200',
        //     'http://172.16.200.172:9200',
        //     'http://172.16.200.173:9200',
        // ],
        hosts: ['http://192.168.1.148:9210'],
        requestTimeout: 1000 * 60 * 10,
        keepAlive: true
    },
    // 缓存配置
    RedisSettings: {
        host: "127.0.0.1",
        port: 6379,
        expires: 60 * 60,
    },
};