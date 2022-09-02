const canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');
let ERASER_LINE_WIDTH = 1,
  ERASER_SHADOW_STYLE = 'blue',
  ERASER_STROKE_STYLE = 'rgba(0,0,255,0.6)',
  ERASER_SHADOW_OFFSET = -5,
  ERASER_SHADOW_BLUR = 20,
  ERASER_RADIUS = 60;

function setEraserAttributes() {
  context.lineWidth = ERASER_LINE_WIDTH;
  context.shadowColor = ERASER_SHADOW_STYLE;
  context.shadowOffsetX = ERASER_SHADOW_OFFSET;
  context.shadowOffsetY = ERASER_SHADOW_OFFSET;
  context.shadowBlur = ERASER_SHADOW_BLUR;
  context.strokeStyle = ERASER_SHADOW_STYLE;
}

function drawEraser(loc) {
  context.save();
  setEraserAttributes();
  context.beginPath();
  context.arc(loc.x, loc.y, ERASER_RADIUS, 0, Math.PI * 2, false);
  context.clip();
  context.stroke();
  context.restore();
}

drawEraser({ x: 100, y: 100 });