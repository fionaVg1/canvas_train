import { drawGrid } from '../util/index.js';
let Sprite = function (name, painter, behaviors) {
  if (name) {
    this.name = name;
  }
  if (painter) {
    this.painter = painter;
  }
  this.top = 0;
  this.left = 0;
  this.width = 10;
  this.height = 10;
  this.velocityX = 0;
  this.velocityY = 0;
  this.visible = true;
  this.animating = false;
  this.behaviors = behaviors || [];
  return this;
}
Sprite.prototype = {
  paint: function (context) {
    if (this.painter && this.visible) {
      this.painter.paint(this, context);
    }
  },
  update: function (context, time) {
    for (let i = 0; i < this.behaviors.length; ++i) {
      this.behaviors[i].execute(this, context, time);
    }
  }
}
/**
 * 精灵行为
 */
let canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  RADIUS = 75;
let painter = {
  paint: (sprite, context) => {
    context.beginPath();
    context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2, RADIUS, 0, Math.PI * 2, false);
    context.clip();
    context.shadowColor = 'rgb(0,0,0)';
    context.shadowOffsetX = -4;
    context.shadowOffsetY = -4;
    context.shadowBlur = 8;
    context.lineWidth = 2;
    context.strokeStyle = 'rgb(100,100,195)';
    context.fillStyle = 'rgba(30,144,255,0.15)';
    context.fill();
    context.stroke();
  }
}
let ball = new Sprite('ball', painter);
drawGrid(context, 'lightgray', 10, 10);
ball.left = 320;
ball.top = 160;
ball.paint(context)