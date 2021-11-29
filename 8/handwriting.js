let canvasWidth = 800;
let canvasHeight = canvasWidth;
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

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