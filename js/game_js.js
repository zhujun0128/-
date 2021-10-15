function Game_start() {
    drawMap();
    game = new Game();
    game.update();
}
function Game() {
    var _this = this;
    this.mario = new Mario();
    this.flag = false;
    this.count = 0;
    this.goldNum = 0;
    this.de = 0;
    this.bi = 0;
    this.score = new Array();
    this.update = function () {
        if(!_this.flag)
        {
            ctx.clearRect(0,0,cvs.width,cvs.height);
            drawMap(_this.mario.deviation);
            _this.mario.draw();
            _this.mario.updatePos();
            _this.calculation();
            _this.showGoldNum();
            _this.isWinOrLoss();
        }
        window.requestAnimationFrame(_this.update);
    };
    this.calculation = function () {
        if(_this.mario.x - 10 <= 2020 && _this.mario.x + 10 >= 2020 && _this.mario.y + imgHeight < land[1])//马里奥碰到旗子
        {
            _this.mario.x = 2020;
            _this.score.push((_this.mario.y - land[1]) * -1);
            drawBanner(_this.mario.deviation,_this.mario.y);
        }
        else
        {
            drawBanner(_this.mario.deviation);
        }
        gold.forEach(function (item,index) {
            if(_this.mario.x + imgWidth / 2 > item[0] && _this.mario.x + imgWidth / 2 < item[0] + goldWidth && _this.mario.y + imgHeight / 2 > item[1]
                && _this.mario.y + imgHeight / 2 < item[1] + goldHeight)//马里奥吃到金币
            {
                _this.goldNum++;
                gold.splice(index,1);
            }
        });
        //计算金币数量的十位和各位
        _this.bi = _this.goldNum % 10;//各位
        if(_this.goldNum >= 10)
        {
            _this.de = Math.floor(_this.goldNum / 10);//十位
            decade_moveOver = 2 - increment * (_this.de + 1);//还有一个0，所以要加一
            bit_moveOver = -330 - increment * _this.bi + increment * (_this.de + 1);
        }
        else
        {
            decade_moveOver = 2;
            _this.de = 0;
            bit_moveOver = -330 - increment * _this.bi;
        }
    };
    this.showGoldNum = function () {//显示金币数量
        if(decade_marTop != decade_moveOver)//实现金币数量滚动显示
        {
            if(_this.de != 0)
            {
                decade_marTop --;
            }
            else
            {
                decade_marTop += 9;
            }
            decade.style.marginTop = decade_marTop + "px";
        }
        if(bit_marTop != bit_moveOver)
        {
            if(_this.bi != 0)
            {
                bit_marTop--;
            }
            else
            {
                bit_marTop += 11;
            }
            bit.style.marginTop = bit_marTop + "px";
        }
    };
    this.isWinOrLoss = function () {
        if(_this.mario.x + imgWidth >= cvsWidth * 2 - roomWidth / 4 && _this.mario.x + imgWidth <= cvsWidth * 2)//走到终点的房子处
        {
            if(gold.length != 0)//没有收集完全部的金币
            {
                alert("马里奥还未收集完全部的金币，请继续收集散落在各处的金币！");
                _this.mario.x -= roomWidth / 4;
            }
            else
            {
                ctx.beginPath();
                ctx.font = "bold 36px Arial";
                ctx.fillStyle = "red";
                ctx.fillText("通关完成，成绩为" + parseInt(Math.max.apply(null,_this.score)) / 10 + "米，获得" + _this.goldNum + "个金币！",
                    cvsWidth / 2 - 280,cvsHeight / 2 -30);
                ctx.fill();
                _this.flag = true;
            }
        }
        if(_this.mario.y > cvsHeight)//掉出(摔死)
        {
            _this.mario.power = false;//取消权限，使得马里奥不能在走动
            _this.mario.v = -10;
            _this.mario.time = 0;
            _this.mario.status[1] = -1;
            _this.mario.y = cvsHeight;
            _this.count++;
            if(_this.count == 2)//当马里奥升天之后，再次掉落
            {
                ctx.beginPath();
                ctx.font = "bold 36px Arial";
                ctx.fillStyle = "red";
                ctx.fillText("通关失败，游戏结束！",cvsWidth / 2 - 150,cvsHeight / 2 -30);
                ctx.fill();
                _this.flag = true;
            }
        }
        if(_this.flag)
        {
            re_start.style.display = "inline-block";//让重新开始按钮显示出来
        }
    }
}
function Mario() {
    var _this = this;
    this.x = 0;
    this.y = 510;
    this.deviation = 0;
    this.power = true;
    this.speed = 3;
    this.status = [0,0];//第一个元素0表示x不动，-1表示往左走，1表示往右走，第二个元素同理
    this.t = 0;
    this.v = -6;
    this.g = -10;
    this.time = 0;
    this.img1 = new Image();
    this.img1.src = "image/marioR.png";
    this.str1 = "image/marioR.png";
    this.str2 = "image/marioJR.gif";
    this.jump = false;
    this.flag = false;
    this.jump_changeImg = false;
    this.draw = function () {
        _this.setDeviation();
        if(!_this.jump_changeImg)//没有起跳，水平运动
        {
            _this.img1.src = _this.str1;
            ctx.drawImage(_this.img1,_this.img1.width / 4 * (_this.t % 4),0,_this.img1.width / 4,_this.img1.height,
                _this.x - _this.deviation,_this.y,_this.img1.width / 4,_this.img1.height);
        }
        else
        {
            _this.img1.src = _this.str2;
            ctx.drawImage(_this.img1,_this.x - _this.deviation,_this.y);
        }
    };
    this.setNumber1 = function () {
        _this.status[1] = 1;
        _this.time = 1.2;
    };
    this.setNumber2 = function () {
        _this.status[1] = 0;
        _this.t = 3;
        _this.time = 0;
        _this.jump = false;
        _this.jump_changeImg = false;
    };
    this.setDeviation = function () {//当马里奥行走超过一定距离，则设置偏移量，使得背景和其他元素随着马里奥的动作后退（前进）
        if(_this.x > 800)
        {
            if(_this.x - 800 <= 1200)
            {
                _this.deviation = _this.x - 800;
            }
        }
    };
    this.meetBorder = function () {//遇到边框
        pipe.forEach(function (item) {//遇到管道就不让马里奥前进
            if(_this.x + imgWidth >= item[0] && _this.x + imgWidth <= item[0] + item[2])
            {
                if(_this.y > item[1])
                {
                    _this.x = item[0] - imgWidth;
                }
            }
            if(_this.status[0] == -1)//往左
            {
                if(_this.x + imgWidth / 4 > item[0] + item[2] && _this.x + imgWidth / 4 - 5 <= item[0] + item[2])
                {
                    if(_this.y > item[1])
                    {
                        _this.x = item[0] + item[2] - 10;
                    }
                }
            }
        });
        if(_this.x < 0)//超过左边界，不让马里奥前进
        {
            _this.x = 0;
        }
        bench[0].forEach(function (item,index) {//当遇到台阶时，不让马里奥前进
            if(_this.x + imgWidth >= item && _this.x + imgWidth <= item + benchWidth && _this.y >= bench[1] - benchHeight * index)
            {
                _this.x = item - imgWidth;
            }
        });
        springBoard.forEach(function (item) {//当马里奥高度不够，未跳上跳板
            if(_this.x + imgWidth >= item[0] && _this.x + imgWidth <= item[0] + springBoardWidth && _this.y + imgHeight > item[1])
            {
                _this.x = item[0] - imgWidth;
            }
        });
    };
    this.drop = function () {//实现马里奥的下落
        if(_this.y + imgHeight == brick[1])//当马里奥在砖块上时
        {
            for(var i = 0;i < brick.length;i++)
            {
                if(_this.x > brick[0][i - 1] + brickWidth && _this.x < brick[0][i] && brick[i - 1] - brick[i] != brickWidth)
                {//如果当前的x大于砖块的左顶点且小于砖块的右顶点，则让其下落
                    _this.setNumber1();
                    break;
                }
            }
            if(_this.x + imgWidth / 2 < brick[0][0] || _this.x + imgWidth / 2 > brick[0][brick[0].length - 1] + brickWidth)
            {//当马里奥处于砖块的最头部或最尾部，则让其下落
                _this.setNumber1();
            }
        }
        pit.forEach(function (item) {//遇到坑（没有陆地），则让马里奥下落
            if(_this.x + imgWidth / 2 >= item[0] && _this.x + imgWidth / 2 < item[1] && _this.y >= land[1] - imgHeight)
            {
                _this.power = false;
                if(_this.x < item[0])
                {
                    _this.x = item[0];
                }
                _this.setNumber1();
            }
        });
        pipe.forEach(function (item) {//如果当前的x大于管道的左顶点且小于管道的右顶点，则让其下落
            if(_this.x + imgWidth / 2 < item[0] || _this.x + imgWidth / 2 > item[0] + item[2])
            {
                if(_this.y + imgHeight == item[1])
                {
                    _this.setNumber1();
                }
            }
        });
        bench[0].forEach(function (item,index) {//走出台阶，让其下落
            if(_this.x + imgWidth / 2 < item && _this.x + 5 + imgWidth / 2 > item && _this.y + imgHeight == bench[1] - benchHeight * index && !_this.jump)
            {
                _this.setNumber1();
            }
        });
        if(_this.y + imgHeight == springBoard[1])//在跳板上
        {
            if(_this.x + imgWidth / 2 < springBoard[0][0] || _this.x + imgWidth / 2 > springBoard[0][springBoard[0].length - 1] + springBoardWidth)
            {
                _this.setNumber1();
            }
        }
    };
    this.lingering = function () {//实现马里奥停留在砖块，管道上
        brick[0].forEach(function (item) {
            if(_this.x + imgWidth / 2 > item && _this.x < item)//当马里奥处于砖块的区域
            {
                if(_this.y + _this.v * _this.time - 0.5 * _this.g * Math.pow(_this.time,2) <= brick[1] + brickHeight && _this.status[1] != 1)
                {//马里奥处于砖块的下方，则不让马里奥跳的高度超过砖块
                    _this.time = 1.2;
                }
            }
        });
        if(_this.y + imgHeight < brick[1] && _this.jump)
        {
            brick[0].forEach(function (item) {
                if(_this.x + imgWidth / 2 >= item && _this.x <= item)//当马里奥处于砖块的上方且当前的x在砖块的范围内，则让马里奥停在砖块上
                {
                    _this.y = brick[1] - imgHeight;
                    _this.setNumber2();
                }
            })
        }
        pipe.forEach(function (item) {//当马里奥处于管道的上方且当前的x在管道的范围内，则让马里奥停在管道上
            if(_this.x + imgWidth / 2 >= item[0] && _this.x + imgWidth / 2 <= item[0] + item[2] && _this.y + imgHeight <= item[1]
                && _this.y + imgHeight + 5 >= item[1] && _this.jump && _this.time >0.5)
            {
                _this.y = item[1] - imgHeight;
                _this.setNumber2();
            }
        });
        if(_this.y + imgHeight >= land[1] && _this.jump)
        {
            land[0].forEach(function (item) {
                if(_this.x + imgWidth / 2 >= item && _this.x + imgWidth / 2 <= item + landWidth)
                {//当马里奥跳跃的时候，若没遇到砖块等其他停留物，则让其停留在陆地上
                    _this.y = land[1] - imgHeight;
                    _this.setNumber2();
                }
            })
        }
        bench[0].forEach(function (item,index) {//当遇到台阶时，让马里奥在台阶上停留
            if(_this.x + imgWidth / 2 >= item && _this.x + imgWidth / 2 <= item + benchWidth && _this.y + imgHeight <= bench[1] - benchHeight * index
                && _this.y + imgHeight + _this.v * _this.time - 0.5 * _this.g * Math.pow(_this.time,2) >= bench[1] - benchHeight * index
                && _this.jump && _this.time > 0.5)
            {
                _this.y = bench[1] - benchHeight * index - imgHeight;
                _this.setNumber2();
            }
        });
        springBoard[0].forEach(function (item) {//跳上跳板
           if(_this.x + imgWidth / 2 >= item && _this.x + imgWidth / 2 <= item + springBoardWidth && _this.y + imgHeight <= springBoard[1]
               && _this.y + imgHeight + 5 >= springBoard[1] && _this.jump && _this.power)
           {
               _this.y = springBoard[1] - imgHeight;
               _this.setNumber2();
           }
        });
    };
    this.updatePos = function () {
        if(_this.status[0] != 0)
        {
            if(_this.status[0] == -1)//水平位置方向改变，切换图片源
            {
                _this.str1 = "image/marioL.png";
                _this.str2 = "image/marioJL.gif";
            }
            if(_this.status[0] == 1)
            {
                _this.str1 = "image/marioR.png";
                _this.str2 = "image/marioJR.gif";
            }
            _this.x += _this.status[0] * _this.speed;
            _this.meetBorder();
            _this.drop();
            _this.status[0] = 0;
            _this.t++;
        }
        if(_this.status[1] != 0)
        {
            if(_this.time == 0)
            {
                if(_this.y + imgHeight == brick[1] || _this.y + imgHeight == springBoard[1])//判断马里奥当前是否在空中的砖块上或跳板上
                {
                    _this.flag = true;
                }
            }
            if(_this.flag)
            {
                _this.y += _this.v * _this.time - 0.5 * _this.g * Math.pow(_this.time,2);
                _this.time += 0.01;
                _this.jump_changeImg = true;
                if(_this.time >= 1.78)
                {
                    _this.flag = false;
                    _this.jump_changeImg = false;
                }
                return;
            }
            _this.y += _this.v * _this.time - 0.5 * _this.g * Math.pow(_this.time,2);
            _this.time += 0.01;
            _this.jump_changeImg = true;
            _this.lingering();
            if(_this.time != 0)//马里奥在空中，表示已经触发跳跃动作
            {
                _this.jump = true;
            }
        }
    };
    document.onkeydown = function (e) {
        if(_this.power)
        {
            switch(e.keyCode)
            {
                case 37://左
                    _this.status[0] = -1;break;
                case 38://上
                    _this.status[1] = -1;break;
                case 39://右
                    _this.status[0] = 1;break;
                case 40://下
                    _this.status[1] = 1;break;
                default:
                    break;
            }
        }
    }
}