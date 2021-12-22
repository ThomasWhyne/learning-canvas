/**
 * @type { HTMLCanvasElement }
 */
const ele = document.getElementById('canvas');

const canvasWidth = document.body.clientWidth;
const canvasHeight = document.body.clientHeight;

ele.width = canvasWidth;
ele.height = canvasHeight;

ele.style.cssText = `
width:${canvasWidth - 2}px;
height:${canvasHeight - 2}px;
border: 1px solid red;
margin:auto;
`;

function angleToRad(x) {
  return (Math.PI / 180) * x;
}

const ctx = ele.getContext('2d');

const scale = window.devicePixelRatio + 1;

ctx.scale(scale, scale);

function transformValue(x) {
  return Math.floor(x / scale);
}

const clockIndexList = Array.from({ length: 12 }, (_, idx) => idx);

/**
 * @param { CanvasRenderingContext2D } ctx
 */
function drawDialPlate(ctx) {
  ctx.clearRect(0, 0, canvasWidth, canvasWidth);
  ctx.save();

  ctx.beginPath();
  const originX = transformValue(Math.floor(canvasWidth / 2));
  const originY = transformValue(Math.floor(canvasHeight / 2));
  const r = 50;
  ctx.arc(originX, originY, r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(originX, originY, 1, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  const numberList = clockIndexList;
  const dialIndexFontHeight = 12;

  numberList.forEach((num) => {
    const nextX = Math.cos(angleToRad(num * 30)) * r + originX;
    const nextY = originY - Math.sin(angleToRad(num * 30)) * r;

    const indexX =
      Math.cos(angleToRad(num * 30)) * Math.floor(r * 0.9) + originX;
    const indexY =
      originY - Math.sin(angleToRad(num * 30)) * Math.floor(r * 0.9);

    ctx.beginPath();
    ctx.moveTo(indexX, indexY);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();
    ctx.closePath();

    ctx.fillText(
      numberList[num + ((12 % numberList.length) - 1)],
      indexX,
      indexY
    );
  });
}

drawDialPlate(ctx);
