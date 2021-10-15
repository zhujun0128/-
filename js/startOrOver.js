var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var cvsWidth = cvs.width;
var cvsHeight = cvs.height;
var decade = document.getElementById("decade");
var bit = document.getElementById("bit");
var start = document.getElementById("start");
var box = document.getElementById("box");
var re_start = document.getElementById("re_start");
var guidance = document.getElementById("guidance");
var decade_marTop = 2,bit_marTop = -330,increment = 30;
var imgWidth = 60,imgHeight = 60;
var decade_moveOver = decade_marTop,bit_moveOver = bit_marTop;
var landWidth = 60,landHeight = 60;
var brickWidth = 30,brickHeight = 30;
var benchWidth = 60,benchHeight = 60;
var goldWidth = 50,goldHeight = 50;
var springBoardWidth = 30,springBoardHeight = 30;
var roomWidth = 150;
var brick = [[200,230,260,290,320,350],445];//砖块
var land = [[0,60,120,180,240,300,360,420,480,540,600,660,720,780,960,1020,1080,1140,1200,1260,1320,1380,1440,1500,1560,1620,1680,
    1980,2040,2100,2160,2220,2280,2340],570];//陆地
var pit = [[840,960],[1740,1980]];//坑
var pipe = [[640,480,60,100],[1050,440,60,140]];//管道
var bench = [[1440,1500,1560,1620,1680],510];//台阶
var springBoard = [[1870,1900],240];//跳板
var gold = [[140,520],[205,395],[265,395],[325,395],[260,520],[380,520],[645,430],[780,520],[970,520],[1055,390],[1180,520],[1300,520],[1445,460],
    [1565,340],[1685,220],[1875,190],[2120,520],[2200,520]];//金币
var total_goldNum = gold.length;
var banner_y = 90;
var gold_t = 0;
var bg = new Image();
var game = null;
bg.src = "image/bg.jpg";
function onLoad() {
    ctx.drawImage(bg,0,0,cvsWidth,cvsHeight);
}
start.onclick = function () {
    start.style.display = "none";
    box.style.display = "flex";
    guidance.style.display = "none";
    Game_start();
};
re_start.onclick = function () {
    banner_y = 90;
    gold_t = 0;
    gold = [[140,520],[205,395],[265,395],[325,395],[260,520],[380,520],[645,430],[780,520],[970,520],[1055,390],[1180,520],[1300,520],[1445,460],
        [1565,340],[1685,220],[1875,190],[2120,520],[2200,520]];
    decade.style.marginTop = "2px";
    bit.style.marginTop = "-330px";
    decade_marTop = 2;
    bit_marTop = -330;
    decade_moveOver = decade_marTop;
    bit_moveOver = bit_marTop;
    re_start.style.display = "none";
    Game_start();
};