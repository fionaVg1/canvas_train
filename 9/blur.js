let canvasWidth = 800;
let canvasHeight = 600;
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let image = new Image();
let radius = 50;
let clippingRegion = {x:400,y:200,r:radius};
image.src = "4.jpg";
image.onload = function(e){
  initCanvas();
}
function initCanvas(){
  clippingRegion = {x:Math.random()*(canvas.width-2*radius)+radius,y:Math.random()*(canvas.height-2*radius)+radius,r:radius};
  draw(image,clippingRegion);
}
function setClippingRegion(clippingRegion){
  context.beginPath();
  context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false);
  context.clip();
}
function draw(image,clippingRegion){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.save();
  setClippingRegion(clippingRegion);
  context.drawImage(image,0,0);
  context.restore();
}
function show(){ 
  let theAnimation = setInterval(
    function(){
      clippingRegion.r += 20;
      if(clippingRegion.r>1000){
        clearInterval(theAnimation);
      }
      draw(image,clippingRegion);
    },30
  )
}
function reset(){
  initCanvas();
}
