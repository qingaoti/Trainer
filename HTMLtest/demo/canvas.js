var canvas = (function () {

    //x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
    var opt =  {
        x:60,
        y:60,
        radius:55,
        process:0,
        backColor:'#ddd',
        proColor: '#6495ED',
        fontColor:'#6495ED'
    };

    function canvas(canvasId,title,memo) {
        var canvas = document.getElementById(canvasId);

        if (canvas.getContext) {
            var cts = canvas.getContext('2d');
        }else{
            return;
        }

        cts.beginPath();
        // 坐标移动到圆心
        cts.moveTo(opt.x,opt.y);
        // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针
        cts.arc(opt.x,opt.y, opt.radius, 0, Math.PI * 2, false);
        cts.closePath();
        // 填充颜色
        cts.fillStyle = opt.backColor;
        cts.fill();

        cts.beginPath();
        // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形
        cts.moveTo(opt.x,opt.y);
        // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形
        cts.arc(opt.x,opt.y, opt.radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * opt.process / 100, true);
        cts.closePath();
        cts.fillStyle = opt.proColor;
        cts.fill();

        //填充背景白色
        cts.beginPath();
        cts.moveTo(opt.x,opt.y);
        cts.arc(opt.x,opt.y, opt.radius - (opt.radius * 0.26), 0, Math.PI * 2, true);
        cts.closePath();
        cts.fillStyle = 'rgba(255,255,255,1)';
        cts.fill();

        // 画一条线
        cts.beginPath();
        cts.arc(opt.x,opt.y, opt.radius-(opt.radius*0.30), 0, Math.PI * 2, true);
        cts.closePath();
        // 与画实心圆的区别,fill是填充,stroke是画线
        cts.strokeStyle = opt.backColor;
        cts.stroke();

        //在中间写字
        cts.font = "bold 9pt Arial";
        cts.fillStyle = opt.fontColor;
        cts.textAlign = 'center';
        cts.textBaseline = 'middle';
        cts.moveTo(opt.x,opt.y);
        cts.fillText(opt.process+"%", opt.x,opt.y);
        cts.fillText(title, opt.x, opt.y-20);
        cts.fillText(memo, opt.x, opt.y+20);
        return canvas;
    }

    return canvas;
})();
