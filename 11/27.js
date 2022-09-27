/**
 * 图片轮播图播放，背景的滚动
 */
let canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  controls = document.getElementById('controls'),
  animateButton = document.getElementById('animateButton'),
  sky = new Image(),
  paused = true,
  lastTime = 0,
  fps = 0,
  skyOffset = 0,
  SKY_VELOCITY = 30;

function erase() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  context.save();
  skyOffset = skyOffset < canvas.width ? skyOffset + SKY_VELOCITY / fps : 0;
  context.save();
  context.translate(-skyOffset, 0);
  context.drawImage(sky, 0, 0);
  context.drawImage(sky, sky.width - 2, 0);
  context.restore();
}

function calculateFps(now) {
  var fps = 1000 / (now - lastTime);
  lastTime = now;
  return fps;
}

function animate(now) {
  if (now === undefined) {
    now = +new Date;
  }
  fps = calculateFps(now);
  if (!paused) {
    erase();
    draw();
  }
  requestAnimationFrame(animate)
}
animateButton.onclick = (e) => {
  paused = paused ? false : true;
  if (paused) {
    animateButton.value = 'Animate';
  } else {
    animateButton.value = 'Pause';
  }
}
canvas.width = canvas.width;
canvas.height = canvas.height;
sky.src = 'analysis.png';
sky.onload = (e) => {
  draw();
}
requestAnimationFrame(animate);

