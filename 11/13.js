import { drawGrid } from '../util/index.js';
const canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  AXIS_MARGIN = 40,
  AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas.height - AXIS_MARGIN },
  AXIS_TOP = AXIS_MARGIN,
  AXIS_RIGHT = canvas.width - AXIS_MARGIN,
  HORIZONTAL_TICK_SPACING = 10,
  VERTICAL_TICK_SPACING = 10,
  AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x,
  AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP,
  NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
  NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,
  TICK_WIDTH = 10,
  TICKS_LINEWIDTH = 0.5,
  TICKS_COLOR = 'navy',
  AXIS_LINEWIDTH = 1.0,
  AXIS_COLOR = 'blue';

function drawAxies() {
  context.save();
  context.strokeStyle = AXIS_COLOR;
  context.lineWidth = AXIS_LINEWIDTH;
  drawHorizontalAxis();
  drawVerticalAxis();

  context.lineWidth = TICKS_LINEWIDTH;
  context.strokeStyle = TICKS_COLOR;
  drawVerticalAxisTicks();
  drawHorizontalAxisTicks();
  context.restore();
}

function drawHorizontalAxis() {
  context.beginPath();
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
  context.stroke();
}

function drawVerticalAxis() {
  context.beginPath();
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
  context.stroke();
}

function drawVerticalAxisTicks() {
  let deltaX;
  for (let i = 1; i < NUM_VERTICAL_TICKS; ++i) {
    context.beginPath();
    if (i % 5 === 0) {
      deltaX = TICK_WIDTH;
    } else {
      deltaX = TICK_WIDTH / 2;
    }
    context.moveTo(AXIS_ORIGIN.x - deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
    context.lineTo(AXIS_ORIGIN.x + deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
    context.stroke();
  }

}

function drawHorizontalAxisTicks() {
  let deltaY;
  for (let i = 0; i < NUM_HORIZONTAL_TICKS; ++i) {
    context.beginPath();
    if (i % 5 === 0) {
      deltaY = TICK_WIDTH;
    } else {
      deltaY = TICK_WIDTH / 2;
    }
    context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y - deltaY);
    context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + deltaY);
    context.stroke();
  }
}
drawGrid(context, 'lightgray', 10, 10);
drawAxies();

