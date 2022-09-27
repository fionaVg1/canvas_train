/**
 * 橡皮筋式选取框
 */
import { drawGrid, windowToCanvas } from '../util/index.js';
let canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  eraseAllButton = document.getElementById('eraseAllButton'),
  strokeStyleSelect = document.getElementById('strokeStyleSelect'),
  guidewireCheckbox = document.getElementById('guidewireCheckbox'),
  drawingSurfaceImageData = {},
  mousedown = {},
  rubberbandRect = {},
  dragging = false,
  guidewires = guidewireCheckbox.checked;

function saveDrawingSurface() {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
  context.putImageData(drawingSurfaceImageData, 0, 0);
}

function updateRubberbandRectangle(loc) {
  rubberbandRect.width = Math.abs(loc.x - mousedown.x);
  rubberbandRect.height = Math.abs(loc.y - mousedown.y);
  if (loc.x > mousedown.x) {
    rubberbandRect.left = mousedown.x;
  } else {
    rubberbandRect.left = loc.x;
  }
  if (loc.y > mousedown.y) {
    rubberbandRect.top = mousedown.y;
  } else {
    rubberbandRect.top = loc.y;
  }
}

function drawRubberbandShape(loc) {
  context.beginPath();
  context.moveTo(mousedown.x, mousedown.y);
  context.lineTo(loc.x, loc.y);
  context.stroke();
}

function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberbandShape(loc);
}

function drawHorizontalLine(y) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(context.canvas.width, y + 0.5);
  context.stroke();
}

function drawVerticalLine(x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height);
  context.stroke();
}

function drawGuidewires(x, y) {
  context.save();
  context.strokeStyle = 'rgba(0,0,230,0.4)';
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontalLine(y);
  context.restore();
}

canvas.onmousedown = (e) => {
  let loc = windowToCanvas(canvas, e.clientX, e.clientY);
  e.preventDefault();
  saveDrawingSurface();
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  dragging = true;
}

canvas.onmousemove = (e) => {
  let loc;
  if (dragging) {
    e.preventDefault();
    loc = windowToCanvas(canvas, e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberband(loc);
    if (guidewires) {
      drawGuidewires(loc.x, loc.y);
    }
  }
}

canvas.onmouseup = (e) => {
  loc = windowToCanvas(canvas, e.clientX, e.clientY);
  restoreDrawingSurface();
  updateRubberband(loc);
  dragging = false;
}

eraseAllButton.onclick = (e) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(context, 'lightgray', 10, 10);
  saveDrawingSurface();
}

strokeStyleSelect.onchange = (e) => {
  context.strokeStyle = strokeStyleSelect.value;
}

guidewireCheckbox.onchange = (e) => {
  guidewires = guidewireCheckbox.checked;
}

context.strokeStyle = strokeStyleSelect.value;
drawGrid(context, 'lightgray', 10, 10);