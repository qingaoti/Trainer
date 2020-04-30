var xss = require("xss");
var options = {
  stripIgnoreTag : false,
  escapeHtml: function(html) {
    return html;
  },
  stripIgnoreTagBody:['script','style']
}; // 自定义规则

var str = JSON.stringify({
  "test": "123<很好>",
  "abc": 321,
  "xss": '<script>..alert("xss")',
});

var strErr = JSON.stringify({
  "test": "123bda",
  "abc": 321,
  "xss":'<script>alert("xss");</scr' + 'ipt>'
});


console.log("str",xss(str,options));
console.log("strErr",xss(strErr,options));

console.log("==========================");
console.log(xss());