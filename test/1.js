/**
 * 
 * @param {左上角横坐标} x1 
 * @param {左上角纵坐标} y1 
 * @param {右下角横坐标} x3 
 * @param {右下角纵坐标} y3 
 * @param {圆圈半径} r 
 * @param {左下角圆角半径} r2 
 */
function drawPhotoGuidWidthCircle(x1, y1, x3, y3, r, r2) {

  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    let x2 = x3, y2 = y1, x4 = x1, y4 = y3;
    ctx.strokeStyle = "#FF833C";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x1, y1, r, 0, Math.PI * 2, true);
    ctx.moveTo(x1 + r, y1);
    ctx.lineTo(x2 - r, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x2, y2, r, 0, Math.PI * 2, true);
    ctx.moveTo(x2, y2 + r);
    ctx.lineTo(x3, y3 - r);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x3, y3, r, 0, Math.PI * 2, true);
    ctx.moveTo(x3 - r, y3);
    ctx.lineTo(x4 + r2, y4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x4 + r2, y4 - r2, r2, Math.PI, Math.PI * 0.5, true);
    ctx.moveTo(x4, y4 - r2);
    ctx.lineTo(x1, y1 + r);
    ctx.stroke();
  }
}
// this.drawPhotoGuidWidthCircle(120, 37 + 4, 120 + 37 + 375 + 37, 37 + 4 + 37 + 803 + 37, 37, 16);

function drawReact(x1, y1, x3, y3) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#FF833C";
    ctx.lineWidth = 4;
    let w = x3 - x1, h = y3 - y1;
    ctx.strokeRect(x1, y1, w, h);
  }
}
this.drawReact(120, 37 + 4, 120 + 37 + 375 + 37, 37 + 4 + 37 + 803 + 37);