var mctName = "桂林金优胜贸易有限公司（力帆）";
var _mctName = mctName.replace(/\(|\)|\（|\）/gi, '.');
console.log(new RegExp(_mctName));

const arr = {
    name:"xiaom",
    age:88,
    dress:"湖北"
};
const  newArr = {
    ...arr,
    class:"asd"
}
console.log(newArr);