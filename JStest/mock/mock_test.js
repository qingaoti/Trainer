const Mock = require('mockjs');

const NameList = num  =>  {
    let arr = [];
    for (let i = 0; i <num; i++) {
        arr.push(Mock.Random.cname());
    }
    return arr;
};

const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|3-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'account|5-10':"",
        "name|+1":NameList(10),
        "star|1-10": "★",
        "age|18-50":50,
        "online|1": true
    }]
});
// 输出结果
console.log(JSON.stringify(data, null, 4));

// 输出结果
console.log("随机输出:",NameList(3));
