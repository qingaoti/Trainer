import 'whatwg-fetch';

fetch("/students.json")
    .then(
        function(response){
            if(response.status!==200){
                console.log("存在一个问题，状态码为："+response.status);
                return;
            }
            //检查响应文本
            response.json().then(function(data){
                console.log(data);
            });
        }
    )
    .catch(function(err){
        console.log("Fetch错误:"+err);
    });