/**
 * 优化前的复制canvas并放大图片和水印
 */
const canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');
let image = new Image(),
  scaleSlider = document.getElementById('scaleSlider'),
  scaleOuput = document.getElementById('scaleOuput'),
  scale = scaleSlider.value,
  MINIMUM_SCALE = 1.0,
  MAXIMUM_SCALE = 3.0;

function drawScaled() {
  let w = canvas.width,
    h = canvas.height,
    sw = w * scale,
    sh = h * scale;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  drawWatermark();
  context.drawImage(canvas, 0, 0, canvas.width, canvas.height, w / 2 - sw / 2, h / 2 - sh / 2, sw, sh);
}


function drawScaleText(value) {
  let text = parseFloat(value).toFixed(2);
  let percent = parseFloat(value - MINIMUM_SCALE) / parseFloat(MAXIMUM_SCALE - MINIMUM_SCALE);
  scaleOutput.innerText = text;
  percent = percent < 0.35 ? 0.35 : percent;
  scaleOutput.style.fontSize = percent * MAXIMUM_SCALE / 1.5 + 'em';
}

function drawWatermark() {
  let lineOne = 'Copyright',
    lineTwo = 'Acme Inc.',
    textMetrics,
    FONT_HEIGHT = 128;
  context.save();
  context.font = FONT_HEIGHT + 'px Arial';
  textMetrics = context.measureText(lineOne);
  context.globalAlpha = 0.6;
  context.translate(canvas.width / 2, canvas.height / 2 - FONT_HEIGHT / 2);
  context.fillText(lineOne, -textMetrics.width / 2, 0);
  context.strokeText(lineOne, -textMetrics.width / 2, 0);
  textMetrics = context.measureText(lineTwo);
  context.fillText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT);
  context.strokeText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT);
  context.restore();
}

scaleSlider.onchange = (e) => {
  scale = e.target.value;
  if (scale < MINIMUM_SCALE) {
    scale = MINIMUM_SCALE;
  } else if (scale > MAXIMUM_SCALE) {
    scale = MAXIMUM_SCALE;
  }
  drawScaled();
  drawScaleText(scale);
}
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'yellow';
context.shadowColor = 'rgba(50,50,50,1)';
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 10;
let glassSize = 150;
image.src = 'analysis.png';
image.onload = (e) => {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  drawWatermark();
  drawScaleText(scaleSlider.value);
}