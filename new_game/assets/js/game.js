var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 480;
document.body.appendChild(canvas);

// Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "css/images/background.png";

//warrior
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "css/images/warrior.png";

//goblin
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "css/images/goblin.png";

//objects
var hero = {
  speed: 270
};
var monster = {};
var monstersCaught = 0;

//controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

//reset
var reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;


//randomize
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};


//update
var update = function (modifier) {
  if (38 in keysDown) {
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) {
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
  }


  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
};


var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

 
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};


var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;


  requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//START!
var then = Date.now();
reset();
main();

// $('#restart').click(function() {
//   var restart = score;
//   if(score < 30){
//     restart();
//   }
// });
