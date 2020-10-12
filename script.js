var target_x, target_y;
var MOTION_STEP = 2;
var TICK = 100;
var MIN_TICK = 2;
var x =0, y =0;

function sprite() {
  return document.getElementById("sprite");
}
function refresh(){
  sprite().style.top = y + "px";
  sprite().style.left = x + "px";
}

function isThere() {
  return Math.abs(x - target_x) + Math.abs(y - target_y) < MOTION_STEP;
}

function progressToTarget(callback) {
  if(isThere()) {return callback();}
  var dx = Math.sign(target_x - x) * MOTION_STEP;
  var dy = Math.sign(target_y - y) * MOTION_STEP;
  x += dx;
  y += dy;
  refresh();
  setTimeout(function(){progressToTarget(callback);}, TICK);
}


function goTo(x_, y_, time, callback) {
  console.log(`Going to: ${x_}, ${y_} in ${time} ms`);
  target_x = x_;
  target_y = y_;
  var d = Math.sqrt(Math.pow(target_x-x,2)+Math.pow(target_y-y,2));
  TICK = Math.max(MIN_TICK, time / (d/MOTION_STEP));
  if(TICK == MIN_TICK){
    MOTION_STEP = d/(time/MIN_TICK);
  }
  progressToTarget(callback);
}

function linearMove() {
  var target_x = (2 * Math.random() - 0.5) * window.innerWidth;
  var target_y = (2 * Math.random() - 0.5) * window.innerHeight;
  var wait = Math.random() * 2000;
  var speed = Math.random() * 2000;

  var f = function(){
    console.log(`Waiting ${wait} ms`);
    setTimeout(linearMove, wait);
  }
  goTo(target_x, target_y, speed, f);
}



function move() {
  linearMove();
}



window.onload = function() {
  move();
}
