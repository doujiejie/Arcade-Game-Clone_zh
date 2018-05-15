// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.dt = dt;
    var updatedX = this.x + this.speed * dt;
    this.checkCollisions();
    if (this.x < 510) {
        this.x = updatedX;
        return this.x;
    } else {
        this.x = 0;
        return this.x
    }

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//碰撞函数
Enemy.prototype.checkCollisions = function() {
    var playerX = player.x;
    var playerY = player.y;
    // 通过 this.y、this.y 来获取到 Enemy 实例的 x、y 坐标；
    // 另外，通过绝对值函数稍微简化了一点碰撞检测条件判断
    if (this.y === playerY && Math.abs(this.x - playerX) < 60) {
        player.reset();
    }
}

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
// 
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.player = 'images/char-cat-girl.png';
};

Player.prototype.update = function() {
    // 通关函数
    // 当玩家过河时重置cat
    if (this.y < 60) {
        this.reset();
    };
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    return this.x
    this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(keyEvent) {
    this.keyEvent = keyEvent;
    if (keyEvent === 'left') {
        if (this.x != -2) {
            var moveLeft = this.x - 101;
            this.x = moveLeft;
            return this.x;
        } else {
            return false;
        }
    } else if (keyEvent === 'up') {
        var moveUp = this.y - 85
        this.y = moveUp;
        return this.y;
    } else if (keyEvent === 'right') {
        if (this.x != 402) {
            var moveRight = this.x + 101;
            this.x = moveRight;
            return this.x;
        } else {
            return false;
        }
    } else if (keyEvent === 'down') {
        if (this.y != 400) {
            var moveDown = this.y + 85;
            this.y = moveDown;
            return this.y;
        } else {
            return false;
        }

    }
};


// 现在实例化你的所有对象
var enemy1 = new Enemy(-167, 60, 100);
var enemy2 = new Enemy(-100, 145, 220);
var enemy3 = new Enemy(-200, 230, 150);
// var enemy4 = new Enemy(-400, 60, 100);
// var enemy5 = new Enemy(-900, 145, 90);
// var enemy6 = new Enemy(-1230, 230, 20);
// var enemy7 = new Enemy(-900, 60, 10);
// var enemy8 = new Enemy(-780, 145, 300);
// var enemy9 = new Enemy(-730, 230, 100);

// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});