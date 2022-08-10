var canvas = document.getElementById('canvas');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');

  ctx.strokeStyle = "#FF833C";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(120, 37 + 4, 37, 0, Math.PI * 2, true);
  ctx.moveTo(120 + 37, 37 + 4);
  ctx.lineTo(120 + 37 + 375, 37 + 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(120 + 37 + 375 + 37, 37 + 4, 37, 0, Math.PI * 2, true);
  ctx.moveTo(120 + 37 + 375 + 37, 37 + 4 + 37);
  ctx.lineTo(120 + 37 + 375 + 37, 37 + 4 + 37 + 803);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(120 + 37 + 375 + 37, 37 + 4 + 37 + 803 + 37, 37, 0, Math.PI * 2, true);
  ctx.moveTo(120 + 37 + 375, 37 + 4 + 37 + 803 + 37);
  ctx.lineTo(120 + 16, 37 + 4 + 37 + 803 + 37);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(120 + 16, 37 + 4 + 37 + 803 + 37 - 16, 16, Math.PI, Math.PI * 0.5, true);
  ctx.moveTo(120, 37 + 4 + 37 + 803 + 37 - 16);
  ctx.lineTo(120, 37 + 4 + 37);
  ctx.stroke();
}