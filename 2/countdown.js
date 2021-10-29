let WINDOW_WIDTH = 1024;
let WINDOW_HEIGHT = 768;
let RADIUS = 8;
let MARGIN_TOP = 60;
let MARGIN_LEFT = 30;
window.onload = function(){
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext("2d");
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
  render(context)
}
function render(ctx){
  let hours = 12;
  let minutes = 34;
  let seconds =56;
  renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
}
function renderDigit(x,y,num,ctx){
  ctx.fillStyle = "rgb(0,102,153)";
  for(var i=0;i<digit[num].length;i++){
    for(var j=0;j<digit[num][i].length;j++){
      if(digit[num][i][j] === 1){
        ctx.beginPath();
        ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+RADIUS+1,RADIUS,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}