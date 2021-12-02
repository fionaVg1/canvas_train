let canvasWidth = Math.min(800,$(window).width()-20);
let canvasHeight = canvasWidth;
let isMouseDown = false;
let lastLoc = {x:0,y:0};
let lastTimestamp = 0;
let lastLineWidth = -1;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
drawGrid();

$("#clear_btn").click((e)=>{
  context.clearRect(0,0,canvasWidth,canvasHeight);
  drawGrid();
}  
);
function beginStroke(point){
  isMouseDown = true;
  lastLoc = windowToCanvas(point.x,point.y);
  lastTimestamp = new Date().getTime();
}
function endStroke(){
  isMouseDown = false;
}
function moveStroke(point){
  if(isMouseDown){
    //写一个字
    let curLoc = windowToCanvas(point.x,point.y);
    let curTimestamp = new Date().getTime();
    let s = calcDistance(curLoc,lastLoc);
    let diffT = curTimestamp-lastTimestamp;
    let lineWidth = calcLineWidth(diffT,s);
    //draw
    //笔画的速度应该影响粗细，越快，笔画应该越细
    context.beginPath();
    context.moveTo(lastLoc.x,lastLoc.y);
    context.lineTo(curLoc.x,curLoc.y);
    context.strokeStyle = "black";
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.lineJoin="round";
    context.stroke();
    lastLoc = curLoc;
    lastTimestamp = curTimestamp;
    lastLineWidth = lineWidth;
  }
}

canvas.onmousedown = function(e){
  e.preventDefault();
  beginStroke({x:e.clientX,y:e.clientY});
}
canvas.onmouseup = function(e){
  e.preventDefault();
  endStroke();
}
canvas.onmouseout = function(e){
  e.preventDefault();
  endStroke();
}
canvas.onmousemove = function(e){
  e.preventDefault();
  moveStroke({x:e.clientX,y:e.clientY});
}
canvas.addEventListener('touchstart',function(e){
  e.preventDefault();
  touch = e.touches[0];
  beginStroke({x:touch.pageX,y:touch.pageY});
});
canvas.addEventListener('touchmove',function(e){
  e.preventDefault();
   touch = e.touches[0];
  moveStroke({x:touch.pageX,y:touch.pageY});
});
canvas.addEventListener('touchend',function(e){
  e.preventDefault();
  endStroke();
})

function calcLineWidth(t,s){
  let v = s/t;
  let resultLineWidth;
  if(v<=0.1){
    resultLineWidth = 30;
  }else if(v>=10){
    resultLineWidth = 1;
  }else{
    resultLineWidth = 30-(v-0.1)/(10-0.1)*(30-1);
  }
  if(lastLineWidth == -1){
    return resultLineWidth;
  }
  return lastLineWidth*2/3+  resultLineWidth*1/3;
}

function calcDistance(loc1,loc2){
  return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}

function windowToCanvas(x,y){
  let bbox = canvas.getBoundingClientRect();
  return {x:x-bbox.left,y:y-bbox.top};
}

function drawGrid(){
  context.save();
  context.strokeStyle = "rgb(230,11,9)";
  context.beginPath();
  context.moveTo(3,3);
  context.lineTo(canvasWidth-3,3);
  context.lineTo(canvasWidth-3,canvasHeight-3);
  context.lineTo(3,canvasHeight-3);
  context.closePath();
  
  context.lineWidth = 6;
  context.stroke();
  
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(canvasWidth,canvasHeight);
  
  context.moveTo(canvasWidth,0);
  context.lineTo(0,canvasHeight);
  context.moveTo(canvasWidth/2,0);
  context.lineTo(canvasWidth/2,canvasHeight);
  context.moveTo(0,canvasHeight/2);
  context.lineTo(canvasWidth,canvasHeight/2);
  
  context.lineWidth = 1;
  context.stroke();
  context.restore();
}