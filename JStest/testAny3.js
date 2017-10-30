// Array.prototype.testArg = "test";
// console.log(__dirname);
// function funcArg() {
//     console.log(funcArg.name);
//         console.log(funcArg.arguments.testArg);
//      console.log(funcArg.arguments[0]);
// }
//
// console.log(new Array().testArg); // result: "test"
// funcArg(10);


// var arr = new Array(6);
// arr[0] = "George";
// arr[1] = "John";
// arr[2] = "Thomas";
// arr[3] = "James";
// arr[4] = "Adrew";
// arr[5] = "Martin";

// var obj ={
//     imgkey:"asdasd",
//     imgpub:"asdasd"
// };
//
// var tsr = typeof obj;
// console.log(tsr);
//
// if(typeof obj !='string'){
//     console.log("有问题");
// }
//
// console.log(JSON.stringify(arr.slice(0,5)));

var msgTmp = {
    test111 : function (key) {
        var funName = /function\s+(\w+)/.exec(arguments.callee)[1];
        console.log(funName);
    }
};

msgTmp.test111();

var test = function (key) {
    // console.log(key);
    console.log(/function\s+([\S]+)\s*\(/.exec(arguments.callee)[1]);
    // console.log(tmp);
};

function test1 () {
    var funName = /function\s+(\w+)/.exec(arguments.callee)[1];
    console.log(funName);
}

function       myfun1汉字       () {
    console.log(/function\s+([\S]+)\s*\(/.exec(arguments.callee)[1]);
}

// myfun1汉字();

function getArgs(func) {
    // 首先匹配函数括弧里的参数
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

    // 分解参数成数组
    return args.split(",").map(function(arg) {
        // 去空格和内联注释
        return arg.replace(/\/\*.*\*\//, "").trim();
    }).filter(function(arg) {
        // 确保没有undefineds
        return arg;
    });
}

// test();
