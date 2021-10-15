function drawMap(x) {
    var bg = new Image(cvsWidth * 10,cvsHeight);
    var img1 = new Image(landWidth,landHeight);
    var img2 = new Image(landWidth,landHeight);
    var img3 = new Image(brickWidth,brickHeight);
    var img4 = new Image();
    var img5 = new Image(50,50);
    var img6 = new Image();
    bg.src = "image/background1.png";
    img1.src = "image/land1.gif";
    img2.src = "image/land2.gif";
    img3.src = "image/brick1.gif";
    img4.src = "image/flagpole.png";
    img5.src = "image/room.png";
    img6.src = "image/gold" + Math.floor((gold_t++ % 60) / 10) + ".png";
    ctx.drawImage(bg,0 - x,0,cvsWidth,cvsHeight);//绘制背景图片
    ctx.drawImage(bg,cvsWidth - x,0,cvsWidth,cvsHeight);
    ctx.drawImage(img4,0,0,45,200,2020 - x,50,120,580);//绘制旗杆
    ctx.drawImage(img5,0,0,175,240,cvsWidth * 2 - 145 - x,390,150,200);//绘制房子
    for(var i = 0;i < land[0].length;i++)//绘制底部陆地的图片
    {
        ctx.drawImage(img1,land[0][i] - x,land[1] + landHeight,landWidth,landHeight);//不带草坪的图片
        ctx.drawImage(img1,land[0][i] - x,land[1] + landHeight * 2,landWidth,landHeight);//不带草坪的图片
        ctx.drawImage(img2,land[0][i] - x,land[1],landWidth,landHeight);//带草坪的图片
    }
    for(var i = 0;i < brick[0].length;i++)//绘制砖块
    {
        ctx.drawImage(img3,brick[0][i] - x,brick[1],brickWidth,brickHeight);
    }
    for(var i = 0;i < pipe.length;i++)//绘制管道
    {
        var img4 = new Image(pipe[i][2],pipe[i][3]);
        img4.src = "image/pipe.png";
        ctx.drawImage(img4,pipe[i][0] - x,pipe[i][1],pipe[i][2],pipe[i][3]);
    }
    for(var i = 0;i < bench[0].length;i++)//绘制台阶
    {
        ctx.drawImage(img2,bench[0][i] - x,bench[1] - benchWidth * i,benchWidth,benchHeight);//带草坪的图片
        for(var j = 0;j < i;j++)
        {
            ctx.drawImage(img1,bench[0][i] - x,bench[1] + benchHeight * (j - i + 1),benchWidth,benchHeight);//不带草坪的图片
        }
    }
    for(var i = 0;i < springBoard[0].length;i++)//绘制跳板
    {
        ctx.drawImage(img3,springBoard[0][i] - x,springBoard[1],springBoardWidth,springBoardHeight);
    }
    for(var i = 0;i < gold.length;i++)//绘制金币
    {
        ctx.drawImage(img6,gold[i][0] - x,gold[i][1],goldWidth,goldHeight);
    }
}
function drawBanner(x,y) {
    var img5 = new Image(80,80);
    var by = arguments[1] ? arguments[1] : banner_y;
    img5.src = "image/banner.png";
    if(by >= banner_y)//防止旗子落下后，马里奥跳起导致旗子重新升起
    {
        ctx.drawImage(img5,0,0,25,25,2010 - x,by,80,80);//绘制旗子
        banner_y = by;
    }
    else
    {
        ctx.drawImage(img5,0,0,25,25,2010 - x,banner_y,80,80);//绘制旗子
    }
}