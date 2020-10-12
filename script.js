var target_x, target_y;
var MOTION_STEP = 2;
var TICK = 100;
var MIN_TICK = 2;
var x =0, y =0;

function pick(arr){
  var index = Math.floor(Math.random() * (arr.length));
  return arr[index];
}

function sprite() {
  return document.getElementById("sprite");
}

function refresh(){
  sprite().style.top = y + "px";
  sprite().style.left = x + "px";
}

function isAtTarget() {
  return Math.abs(x - target_x) + Math.abs(y - target_y) < MOTION_STEP;
}
function isInScreen(){
  return x > 0 && y > 0 && x < window.innerWidth && y < window.innerHeight;
}

function progressToTarget() {
  if(isAtTarget()) {return move();}
  var dx = target_x - x;
  var dy = target_y - y;
  var skew = dx / dy;
  dx = Math.sign(dx) * MOTION_STEP * skew;
  dy = Math.sign(dy) * MOTION_STEP / skew;
  x += dx;
  y += dy;
  refresh();
  setTimeout(progressToTarget, TICK);
}


function goTo(x_, y_, time) {
  target_x = x_;
  target_y = y_;
  var d = Math.sqrt(Math.pow(target_x-x,2)+Math.pow(target_y-y,2));
  TICK = Math.ceil(Math.max(MIN_TICK, time / (d/MOTION_STEP)));
  if(TICK == MIN_TICK){
    MOTION_STEP = Math.ceil(d/(time/MIN_TICK));
  }
  progressToTarget();
}

function linearMove() {
  var target_x = Math.ceil((2 * Math.random() - 0.5) * window.innerWidth);
  var target_y = Math.ceil((2 * Math.random() - 0.5) * window.innerHeight);
  var speed = Math.ceil(Math.random() * 2000);
  console.log(`Linear move to: ${target_x}, ${target_y} in ${speed} ms`);
  goTo(target_x, target_y, speed);
}

function wait(){
  var wait = Math.ceil(Math.random() * 2000);
  console.log(`Waiting ${wait} ms`);
  setTimeout(move, wait);
  return;
}

function decide(){
  (pick([linearMove, wait]))();
}


function move() {
  setTimeout(decide, 500);
}



window.onload = function() {
  move();
}
