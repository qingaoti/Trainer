var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mytest');

var BlogSchema = new Schema({
    id        : {type : Number, index : true}
    ,title       : {type : String}
    ,age : {type : Number}
    ,name       : {type : String}
    ,name1       : {type : String}
});

mongoose.model("Blog", BlogSchema);

var Blog = mongoose.model("Blog"); //获得model实例

var blog1 = new Blog();
blog1.id = 3;
blog1.title="33333";
blog1.age = 5;

// blog1.save(function(err) {  //存储
//    if (err) {
//        console.log('save failed');
//    }
//    console.log('save success');
// });
//
//Blog.find({id:4},function(err,docs){//查询id为4的记录
//    console.log(docs);
//    console.log('find success');
//});
//
var conditions = {_id:"583bc56edbfc423208aedab4"};
// var update11 = { $inc: { age: 1 }};
// Blog.update(conditions,update11,function(err,docs){//更新
//    console.log(docs);
//    console.log('update success');
// });

var update11 = { $set: {name:'asd',name1:'12332'}};
Blog.update(conditions,update11,function(err,docs){//更新
   console.log(docs);
   console.log('update success');
});

// Blog.count(conditions,function(err,docs){
//    console.log(docs);
//    console.log('update success');
// });



// Blog.findByIdAndUpdate('583bc56edbfc423208aedab4', { $inc: { age: 1 }}, function(err, docs){
//     console.log(docs);
//     console.log('update success');
// });
// //
// Blog.remove({_id:'5816d2dab79ac00b080996b3'},function(err,docs){//删除id为4的记录
//     console.log(docs);
//     console.log('remove success');
// });