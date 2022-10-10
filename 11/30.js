/**
 * 碰撞检测
 */
function ballWillHitLedge(ledge) {
  let ballRight = ball.left + ball.width,
    ledgeRight = ledge.left + ledge.width,
    ballBottom = ball.top + ball.height,
    nextBallBottomEstimate = ballBottom + ball.velocityY / fps;
  return ballRight > ledge.left && ball.left < ledgeRight && ballBottom < ledge.top && nextBallBottomEstimate > ledge.top;
}

function isBallInBucket() {
  let ballCenter = {
    x: ball.left + BALL_RADIUS,
    Y: ball.top + BALL_RADIUS
  },
    distance = Math.sqrt(Math.pow(bucketHitCenter.x - ballCenter.x, 2) + Math.pow(bucketHitCenter.y - ballCenter.y, 2));
  return distance < BALL_RADIUS + bucketHitRadius;
}

function handleCollisions() {
  let bbox = getBoundingBox(ball),
    right = bbox.left + bbox.width,
    bottom = bbox.top + bbox.height;
  if (right > canvas.width || bbox.left < 0) {
    velocityX = -velocityX;
    if (right > canvas.width) {
      ball.left -= right - canvas.width;
    }
    if (bbox.left < 0) {
      ball.left -= bbox.left;
    }
  }
  if (bottom > canvas.height || bbox.top < 0) {
    velocityY = -velocityY;
    if (bottom > canvas.height) {
      ball.top -= bottom - canvas.height;
    }
    if (bbox.top < 0) {
      ball.top -= bbox.top;
    }
  }
}