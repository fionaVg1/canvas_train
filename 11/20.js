const canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  RECTANGLE_WIDTH = 100,
  RECTANGLE_HEIGHT = 100;
context.translate(canvas.width / 2 - RECTANGLE_WIDTH / 2, canvas.height / 2 - RECTANGLE_HEIGHT / 2);
context.strokeRect(0, 0, RECTANGLE_WIDTH, RECTANGLE_HEIGHT);