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

function progressToTarget() {
  if(isThere()) {return;}
  var dx = Math.sign(target_x - x) * MOTION_STEP;
  var dy = Math.sign(target_y - y) * MOTION_STEP;
  x += dx;
  y += dy;
  refresh();
  setTimeout(progressToTarget, TICK);
}


function goTo(x_, y_, time) {
  target_x = x_;
  target_y = y_;
  var d = Math.sqrt(Math.pow(target_x-x,2)+Math.pow(target_y-y,2));
  TICK = Math.max(MIN_TICK, time / (d/MOTION_STEP));
  if(TICK == MIN_TICK){
    MOTION_STEP = d/(time/MIN_TICK);
  }
  progressToTarget();
}



function move() {
  goTo(500, 500, 10000);
}



window.onload = function() {
  move();
}
