/**
 * 图片轮播图播放，背景的滚动
 */
let canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  controls = document.getElementById('controls'),
  animateButton = document.getElementById('animateButton'),
  tree = new Image(),
  nearTree = new Image(),
  grass = new Image(),
  grass2 = new Image(),
  sky = new Image(),
  paused = true,
  lastTime = 0,
  lastFpsUpdate = { time: 0, value: 0 },
  fps = 60,
  skyOffset = 0,
  grassOffset = 0,
  treeOffset = 0,
  nearTreeOffset = 0,
  TREE_VELOCITY = 0,
  FAST_TREE_VELOCITY = 40,
  SKY_VELOCITY = 8,
  GRASS_VELOCITY = 75;

function erase() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
function draw() {
  context.save();
  skyOffset = skyOffset < canvas.width ? skyOffset + SKY_VELOCITY / fps : 0;
  grassOffset = grassOffset < canvas.width ? grassOffset + GRASS_VELOCITY / fps : 0;
  treeOffset = treeOffset < canvas.width ? treeOffset + TREE_VELOCITY / fps : 0;
  nearTreeOffset = nearTreeOffset < canvas.width ? nearTreeOffset + FAST_TREE_VELOCITY / fps : 0;
  context.save();
  context.translate(-skyOffset, 0);
  context.drawImage(sky, 0, 0);
  context.drawImage(sky, sky.width - 2, 0);
  context.restore();

  context.save();
  context.translate(-treeOffset, 0);
  context.drawImage(tree, 100, 240);
  context.drawImage(tree, 1100, 240);
  context.drawImage(tree, 400, 240);
  context.drawImage(tree, 1400, 240);
  context.drawImage(tree, 700, 240);
  context.drawImage(tree, 1700, 240);
  context.restore();

  context.save();
  context.translate(-nearTreeOffset, 0);
  context.drawImage(nearTree, 250, 220);
  context.drawImage(nearTree, 1250, 220);
  context.drawImage(nearTree, 800, 220);
  context.drawImage(nearTree, 1800, 220);
  context.restore();

  context.save();
  context.translate(-grassOffset, 0);
  context.drawImage(grass, 0, canvas.height - grass.height);
  context.drawImage(grass, grass.width - 5, canvas.height - grass.height);
  context.drawImage(grass2, 0, canvas.height - grass2.height);
  context.drawImage(grass2, grass2.width, canvas.height - grass2.height);
  context.restore();
}

function calculateFps(now) {
  let fps = 1000 / (now - lastTime);
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
  requestAnimationFrame(animate);
}

animateButton.onclick = (e) => {
  paused = paused ? false : true;
  if (paused) {
    animateButton.value = 'Animate';
  } else {
    animateButton.value = 'Pause';
  }
}
context.font = '48px Helvetica';
tree.src = 'tree1.jpeg';
nearTree.src = 'tree2.jpeg';
grass.src = 'grass.jpeg';
grass2.src = 'grass2.jpeg';
sky.src = 'sky.jpeg';
sky.onload = (e) => {
  draw();
}
requestAnimationFrame(animate);




