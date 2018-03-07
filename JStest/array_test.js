var array = [
    {name:"王虎",age:19},
    {name:"张三",age:15}
];

array.every(function (t) {
    if(t.name == "张三"){
        console.log(t);
        return
    }
    return true;
});