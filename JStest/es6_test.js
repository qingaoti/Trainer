/**  ES5 **/
// var total = values.reduce(function (a, b) {
//     return a + b;
// }, 0);
// var total = values.reduce((a, b) => a + b, 0);

// var a = [];
// for (var i = 0; i < 10; i++) {
//     a[i] = function () {
//         console.log(i);
//     };
// }
// a[6](); // 10

console.log(function (i) {return i + 1;}(3));


/**  ES6  **/
console.log("*****************************ES6*****************************");

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 10

const PI = Math.PI;
console.log(PI);
// PI = 21;  //Module build failed: SyntaxError: /es6/app.js: "PI" is read-only


class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        setTimeout( () => {
                console.log(this.type + ' says ' + say)
        }, 1000);
    }
}

let animal = new Animal();
animal.says('hello'); //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat();
cat.says('hello'); //cat says hello
cat.name = "xiao mao";
cat.dress = "武汉";
cat.sex = "公";

console.log(cat);

console.log(((i) => i + 1 )(3));

console.log(((x,y) => { x-- ; y++ ; return x*y})(3,3));

console.log(`
  There are ${cat.name} items
   in your basket, ${cat.dress}
  are on sale!
`);

console.log(() => `${cat.name} cacaca ${cat.dress}`);

// <Link to={`/taco/${taco.name}`}>{taco.name}</Link>

let dog = {type: 'animal', many: 2};
let { type, many} = dog;
console.log(type, many);   //animal 2

//默认值
function moren(type = 'morenxxxxx'){
    console.log(type)
}
moren();

//rest语法
function rest(...types){
    console.log(types)
}
rest('cat', 'dog', 'fish'); //["cat", "dog", "fish"]
rest(1,"ds");
rest(1);

// ... 组装数组
const todos = ['Learn dva'];
var list1 = [...todos, 'Learn antd'];
console.log(list1);  // ['Learn dva', 'Learn antd']

const arr = ['a', 'b', 'c'];
const [first, ...other] = arr;
console.log(other);  // ['b', 'c']

// With ignore
const [first1, , ...other1] = arr;
console.log(other1);   // ['c']

function foo(x, y, z) {
    console.log(x+y+z);
}
const args = [1,2,3];
foo(...args);

// window.fetch

// fetch("http://blog.parryqiu.com")
//     .then(function(response){
//         console.log(response.status);
//         console.log(response.statusText);
//         console.log(response.ok);
//     })


const delay = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
});
};

delay(1000).then(_ => {
    console.log('executed');
});