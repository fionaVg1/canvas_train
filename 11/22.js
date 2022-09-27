const canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');
let image = new Image(),
  scaleSlider = document.getElementById('scaleSlider'),
  scale = 1.0,
  MINIMUM_SCALE = 1.0,
  MAXIMUM_SCALE = 3.0;

function drawImage() {
  let w = canvas.width,
    h = canvas.height,
    sw = w * scale,
    sh = h * scale;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, w / 2 - sw / 2, h / 2 - sh / 2, sw, sh);
}
function drawScaleText(value) {
  let text = parseFloat(value).toFixed(2);
  let percent = parseFloat(value - MINIMUM_SCALE) / parseFloat(MAXIMUM_SCALE - MINIMUM_SCALE);
  scaleOutput.innerText = text;
  percent = percent < 0.35 ? 0.35 : percent;
  scaleOutput.style.fontSize = percent * MAXIMUM_SCALE / 1.5 + 'em';
}

scaleSlider.onchange = (e) => {
  scale = e.target.value;
  if (scale < MINIMUM_SCALE) {
    scale = MINIMUM_SCALE;
  } else if (scale > MAXIMUM_SCALE) {
    scale = MAXIMUM_SCALE;
  }
  drawScaleText(scale);
  drawImage();
}
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'yellow';
context.shadowColor = 'rgba(50,50,50,1)';
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 10;
image.src = 'analysis.png';
image.onload = (e) => {
  drawImage();
  drawScaleText(scaleSlider.value);
}