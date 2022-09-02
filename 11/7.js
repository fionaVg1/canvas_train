const canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  repeatRadio = document.getElementById('repeatRadio'),
  noRepeatRadio = document.getElementById('noRepeatRadio'),
  repeatXRadio = document.getElementById('repeatXRadio'),
  repeatYRadio = document.getElementById('repeatYRadio'),
  image = new Image();

function fillCanvasWidthPattern(repeatString) {
  var pattern = context.createPattern(image, repeatString);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = pattern;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fill();
}

repeatRadio.onclick = (e) => {
  fillCanvasWidthPattern('repeat');
}
repeatXRadio.onclick = (e) => {
  fillCanvasWidthPattern('repeat-x');
}
repeatYRadio.onclick = (e) => {
  fillCanvasWidthPattern('repeat-y');
}
noRepeatRadio.onclick = (e) => {
  fillCanvasWidthPattern('no-repeat');
}
image.src = './sprite.png';
image.onload = (e) => {
  fillCanvasWidthPattern('repeat');
}