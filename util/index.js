export function drawGrid(context, color, stepx, stepy) {
  context.strokeStyle = color;
  context.lineWidth = 0.5;
  for (let i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
  }
  for (let i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
  }
}

export function windowToCanvas(canvas, x, y) {
  let bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  }
}

export function drawBackground(context) {
  let canvas = context.canvas, VERTICAL_LINE_SPACING = 12, i = canvas.height;
  context.clearRect(0, 0, canvas.clientWidth, canvas.height);
  context.strokeStyle = 'lightgray';
  context.lineWidth = 0.5;
  while (i > VERTICAL_LINE_SPACING * 4) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
    i -= VERTICAL_LINE_SPACING;
  }
}
