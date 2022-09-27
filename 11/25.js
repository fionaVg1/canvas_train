/**
 * 优化后的复制canvas并放大图片和水印
 * 采用离屏canvas用来存放临时性的图像信息
 */
const canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');
let offscreenCanvas = document.createElement('canvas'),
  offscreenContext = offscreenCanvas.getContext('2d');
let video = document.getElementById('video'),
  controlButton = document.getElementById('controlButton'),
  flipCheckbox = document.getElementById('flipCheckbox'),
  colorCheckbox = document.getElementById('colorCheckbox'),
  imageData,
  poster = new Image();

function removeColor() {
  let data, width, average,
    imageData = offscreenContext.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  data = imageData.data;
  width = data.width;
  for (let i = 0; i < data.length - 4; i += 4) {
    average = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = average;
    data[i + 1] = average;
    data[i + 2] = average;
  }
  offscreenContext.putImageData(imageData, 0, 0);
}
function drawFlipped() {
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(Math.PI);
  context.translate(-canvas.width / 2, -canvas.height / 2);
  context.drawImage(offscreenCanvas, 0, 0);
  context.restore();
}

function nextVideoFrame() {
  if (video.ended) {
    controlButton.value = 'Play';
  } else {
    offscreenContext.drawImage(video, 0, 0);
    if (!colorCheckbox.checked) {
      removeColor();
    }
    if (flipCheckbox.checked) {
      drawFlipped();
    } else {
      context.drawImage(offscreenCanvas, 0, 0);
    }
    requestAnimationFrame(nextVideoFrame);
  }
}

function startPlaying() {
  requestAnimationFrame(nextVideoFrame);
  video.play();
}

function stopPlaying() {
  video.pause();
}

controlButton.onclick = (e) => {
  if (controlButton.value === 'Play') {
    startPlaying();
    controlButton.value = 'Pause';
  } else {
    stopPlaying();
    controlButton.value = 'Play';
  }
}
poster.onload = () => {
  context.drawImage(poster, 0, 0);
}
poster.src = 'analysis.png';
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;