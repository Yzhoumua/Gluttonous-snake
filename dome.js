//点击开始游戏  startpage消失  游戏开始
//随机出现食物，出现三节蛇开始运动
//按上下左右键根据方向改变方向
//判断是否吃到食物  食物消失，蛇加一
//判断游戏结束，弹出框
alert("贪吃蛇4手机PC兼容")
var startP = document.getElementById('startP');//游戏继续按钮
var close = document.getElementById('close');//关闭弹框
var lose = document.getElementById('loser');//弹框
var content = document.getElementById('content');//贪吃蛇移动的范围
var startPage = document.getElementById("startPage");//游戏开始按钮
var snakeMove;//蛇运动定时器
var speed = 200;//速度
var scoreBox = document.getElementById('score');//分数
var loserScore = document.getElementById('loserScore');//结束分数
var startBtn = document.getElementById('startBtn');//逻辑判断，游戏开始
var startGameBool = true;//是否可以开始游戏
var startPaushBool = true;//是否暂停了游戏
var Tips = document.getElementById('Tips');
var cont = 1;
var pcAndphone;
var Mobileterminal = document.getElementById("Mobileterminal");
var tp = document.getElementById('tp');
var lf = document.getElementById('lf');
var rg = document.getElementById('rg');
var bm = document.getElementById('bm');
var orientation;
var key = true;
var suspend = document.getElementById("suspend")//播放
var start = document.getElementById("start")//音乐
var over = document.getElementById('over');
var d = true;
if(d){
    start.play()
    d = false;
}
startmusic();
function init() {
    //地图属性
    this.mapW = parseInt(getComputedStyle(content).width);//地图宽
    this.mapH = parseInt(getComputedStyle(content).height);//地图高
    this.mapDiv = content; //mapDiv是贪吃蛇移动的范围
    //食物
    this.foodW = 20;//食物的宽
    this.foodH = 20;//食物的高
    this.foodX = 0;//食物的初始坐标X轴
    this.foodY = 0;//食物的初始坐标Y轴
    //蛇
    this.snakeW = 20;//蛇的宽度
    this.snakeH = 20;//蛇的高度
    this.snakeBody = [[4, 3, "head"], [3, 3, "body"], [2, 3, "body"]];//整条蛇，三节，一节用一个数组表示，第一节的头，第二节以后是身体
    //X  Y值 
    //游戏属性
    this.direct = "right";//默认初始化方向 == 右方向
    this.left = false;//用锁来判断当前的方向能否改变  如果是右，左右方向没有用
    this.right = false;//用锁来判断当前的方向能否改变  如果是左，左右方向没有用
    this.up = true;//用锁来判断当前的方向能否改变  如果是上，上下左右方向有用
    this.down = true;//用锁来判断当前的方向能否改变  如果是下，左右方向有用
    //分数
    this.score = 0;
}
//游戏初始化参数

function startGame() {
    init();
    startPage.style.display = "none";//开始游戏按钮消失
    startP.style.display = "block";//游戏继续按钮显示
    food();//生成一个食物
    snake();//生成一条蛇
    bindEvent();//根据键盘的方向让他运动
}
//游戏开始执行

function food() {
    var food = document.createElement('div');//动态的创建一个DOM DIV元素
    food.style.width = this.foodW + "px";//DIV元素食物的宽
    food.style.height = this.foodH + "px";//DIV元素食物的高
    food.style.position = "absolute";//DIV元素的定位--绝对定位；
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));//随机出现的位置X轴
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));//随机出现的位置Y轴
    food.style.left = this.foodX * 20 + "px";//赋值之后的DIV X坐标轴
    food.style.top = this.foodY * 20 + "px";//赋值之后的DIV Y坐标轴
    this.mapDiv.appendChild(food).setAttribute('class', 'food')//把DIV做为子元素插入到content区域内，同时起一个Class类名为food
}
//食物的生成

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');//生成一个蛇div元素
        snake.style.width = this.snakeW + "px";//蛇的宽度
        snake.style.height = this.snakeH + "px";//蛇的高度
        snake.style.position = "absolute";//给这个Div加定位，-- 绝对定位
        snake.style.left = this.snakeBody[i][0] * 20 + "px";//每一位蛇身的X轴；
        snake.style.top = this.snakeBody[i][1] * 20 + "px";//每一个蛇身的Y轴；
        snake.classList.add(this.snakeBody[i][2]);//给这个蛇身的每一位加一个class类名
        this.mapDiv.appendChild(snake).classList.add('snake');//把当前Div插入到content里面并且给他加上一个名为snake的class类名
        switch (this.direct) {//让蛇头旋转
            case 'right'://右不转
                break;
            case 'up'://如果是上顺时针让他旋转270度
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left'://如果是左顺时针让他旋转180度
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'down'://如果是下顺时针让他旋转90度
                snake.style.transform = 'rotate(90deg)';
                break;
        }
    }//根据蛇的数组长度来生成div
}
//生成一条蛇
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {//从末尾开始往前进行循环
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];//蛇的第一位每一位snake body等于前面那一位Y的值
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];//蛇的第二位每一位snake body等于前面那一位Y的值
    }

    switch (this.direct || bb) {//判断方向
        case 'right':
            this.snakeBody[0][0] += 1;//改变蛇头的X轴坐标
            break;//右方向
        case 'up':
            this.snakeBody[0][1] -= 1;//改变蛇头的Y轴坐标
            break;//上方向
        case 'left':
            this.snakeBody[0][0] -= 1;//改变蛇头的X轴坐标
            break;//左方向
        case 'down':
            this.snakeBody[0][1] += 1;//改变蛇头的Y轴坐标
            break;//下方向
    }
    removeClass('snake');//把原来的蛇删掉
    snake();//重新渲染一条蛇

    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        //根据蛇头的X轴，如果和食物的X值相等并且和Y值相等
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];//取出最后一位的位置X轴
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];//取出最后一位的位置Y轴

        switch (this.direct || bb) {//判断上下左右方向
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                //添加进去一个数组如果是右，最后一位Y轴不变，X变
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            //添加进去一个数组如果是上，最后一位X轴不变，Y变
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            //添加进去一个数组如果是左，最后一位Y轴不变，X变
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            //添加进去一个数组如果是下，最后一位X轴不变，Y变
        }
        this.score += 1;//当前的分数加1
        scoreBox.innerHTML = this.score;//改变分数值
        removeClass('food');//食物再消失
        food();//生成一个新的食物
    }
    //碰到食物
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        //判断蛇头的X坐标如果小于0或者蛇头大于游戏区域的值了
        relodGame();//弹出游戏结束
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        //判断蛇头的Y坐标如果小于0或者蛇头大于游戏区域的值了
        relodGame();//弹出游戏结束
    }
    var snakeHX = this.snakeBody[0][0];//把蛇头的X坐标取出来
    var snakeHY = this.snakeBody[0][1];//把蛇头的Y坐标取出来
    for (var i = 1; i < this.snakeBody.length; i++) {//从头后面的身体循环
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            //如果蛇头的X轴等于身体的X轴并且蛇头的Y轴等于身体的Y轴的时候
            relodGame();//弹出游戏结束
        }
    }
}
//运动
function relodGame() {
    sp();
    removeClass('snake');//清除蛇
    removeClass('food');//清除食物
    clearInterval(snakeMove);//清除定时器运动
    this.snakeBody = [[4, 3, "head"], [3, 3, "body"], [2, 3, "body"]];//蛇位置初始化
    this.direct = "right";//方向初始值
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //判断方向上下左右初始值
    lose.style.display = 'block';//弹框出现
    loserScore.innerHTML = this.score;//当前分数
    this.score = 0;//分数初始化
    scoreBox.innerHTML = this.score;//页面分数初始化
    startGameBool = true;
    startPaushBool = true;
    startP.setAttribute('src', './img/start.png');

}
//游戏结束

function removeClass(className) {
    var ele = document.getElementsByClassName(className);//判断看他有没有class
    while (ele.length > 0) {//当元素的length值大于0
        ele[0].parentNode.removeChild(ele[0]);//找到他的父级，在删除掉他的父级的第一位
    }
}
//删掉传进来的class元素

function setDerict(code) {
    switch (code || b) {//传进来的值
        case 37:
            if (this.left) {//判断上下左右键
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        //左光标
        case 38:
            if (this.up) {//判断上下左右键
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        //上光标
        case 39:
            if (this.right) {//判断上下左右键
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        //右光标
        case 40:
            if (this.down) {//判断上下左右键
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        //下光标
        default:
            break;
        //如果都不是
    }
}
//判断按的什么键

bindEvent()
function bindEvent() {
    close.onclick = function () {
        //点击的时候
        lose.style.display = 'none';
        //让弹框消失
    }
    startBtn.onclick = function () {//游戏开始事件
        startAndPaush();//函数执行
    }
    startP.onclick = function () {
        startAndPaush();
    }
}
//键盘绑定事件
bm.ontouchstart = function () {
    var b = 40;
    setDerict(b)
}
tp.ontouchstart = function () {
    var b = 38;
    setDerict(b)

}
rg.ontouchstart = function () {
    var b = 39;
    setDerict(b)

}
lf.ontouchstart = function () {
    var b = 37;
    setDerict(b)

}
function startAndPaush() {//逻辑判断函数
    if (startPaushBool) {//如果当前没有暂停游戏
        if (startGameBool) {//而且可以开始游戏的
            startGame();//开始游戏
            startGameBool = false;//让锁关了
        }
        startP.setAttribute('src', './img/pause.png');//改变图片
        document.onkeydown = function (e) {
            var code = e.keyCode//获取到这个事件的源对象并赋值到code里面
            setDerict(code);//做为一个实参传入函数
        }//绑定鼠标落下事件
        snakeMove = setInterval(function () {
            move();
        }, speed)
        startPaushBool = false;//让锁关了
    } else {//游戏暂停
        startP.setAttribute('src', './img/start.png');//改变图片
        clearInterval(snakeMove);//清除定时器
        document.onkeydown = function (e) {//取消键盘点击事件
            e.returnValue = false;
            return false;
        }
        startPaushBool = true;//让锁打开
    }
}
function IsPC() {
    if(key){
        orientatWion = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
        key = false
    }
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
   pcAndphone = flag;
   jianrong();
}

IsPC();
function jianrong() {
    if (pcAndphone == true) {

    } else {
        speed = 300;
        Mobileterminal.style.display = "block";
        if(orientatWion == 'portrait'){
            Tips.style.display = "block";
        }else{
            Tips.style.display = "none";
        }
    }

}

var updataOrientation = function () {
    orientatWion = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
    jianrong();
   }
   window.addEventListener('resize', updataOrientation, false);

   function startmusic(){
    zt();
    var key = true;
    var timer;
    suspend.onclick = function(){
        if(key){
            start.pause();
            suspend.style.backgroundImage = "url(img/bf.png)";
            suspend.style.transform = "rotate(0deg)";
            clearInterval(timer);
            key = false;
        }else{
            start.play();
            suspend.style.backgroundImage = "url(img/zt.png)";
            key = true;
            zt();
        }
    }
     function zt(){
         var a = 1;
         
        timer = setInterval(function(){
            a++;
            suspend.style.transform = "rotate(" + a + "deg)";
           },20);
     }  
}


function sp(){
    over.play()
}