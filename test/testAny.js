// var s = undefined;
// var a = '';
// var c = 0;
//
// var test = s.toString() || '';
//
// var foo = {
// }
//
// console.log(test);
//
// if(!s) console.log('没有值');
// if(!a) console.log('没有值');
// if(!c) console.log('没有值');
//
// var s = {};
// var a = '2';
// var c = 1;
//
// if(!s) console.log('没有值');
// if(!a) console.log('没有值');
// if(!c) console.log('没有值');
// var myObj ='';
//
// if (!myObj) {
//     myObj = {
//         a:123,
//         say:function (){
//             return '123';
//         }
//     };
// }
//
// var a = new myObj();
// if(a.say()){
//     console.log('有这个方法!');
// }


//构造函数
//使自己的对象多次复制，同时实例根据设置的访问等级可以访问其内部的属性和方法
//当对象被实例化后，构造函数会立即执行它所包含的任何代码
function myObject(msg){
    //特权属性(公有属性)
    this.myMsg = msg; //只在被实例化后的实例中可调用
    this.address = '上海';

    //私有属性
    var name = '豪情';
    var age = 29;
    var that = this;

    //私有方法
    function sayName(){
        alert(that.name);
    }
    //特权方法(公有方法)
    //能被外部公开访问
    //这个方法每次实例化都要重新构造而prototype是原型共享，所有实例化后，都共同引用同一个
    this.sayAge = function(){
        alert(name); //在公有方法中可以访问私有成员
    }
    //私有和特权成员在函数的内部，在构造函数创建的每个实例中都会包含同样的私有和特权成员的副本，
    //因而实例越多占用的内存越多
}

//公有方法
//适用于通过new关键字实例化的该对象的每个实例
//向prototype中添加成员将会把新方法添加到构造函数的底层中去
myObject.prototype.sayHello = function(){
    alert('hello everyone!');
}
//静态属性
//适用于对象的特殊实例，就是作为Function对象实例的构造函数本身
myObject.name = 'china';
//静态方法
myObject.alertname = function(){
    alert(this.name);
}
//实例化
var m1 = new myObject('111');

m1.__proto__.dd = function () {
    console.log('我的方法');
}

if(m1 instanceof Object){
    console.log('是对象!');
}else{
    console.log('没有这个方法address!');
}
//
if(m1.__proto__.hasOwnProperty ('dd')){
    console.log('有这个方法toObj!');
}else {
    console.log('没有这个方法toObj!');
}

console.log(123);