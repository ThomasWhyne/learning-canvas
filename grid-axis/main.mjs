import { normalizeCoordinate } from '../utils.mjs';
/**
 * @type { HTMLCanvasElement }
 */
const cav = document.getElementById('canvs');
const ctx = cav.getContext('2d');

cav.width = 500;
cav.height = 500;

cav.style.cssText = `width:500px;height:500px;`;

const ChessColorTuple = ['black', 'white'];

const ChessPlate = [];

const store = {
  lastStep: {
    __colorIndex: 0,
    get colorIndex() {
      const thisIndex = this.__colorIndex;
      this.__colorIndex = (thisIndex + 1) % 2;
      return thisIndex;
    },
  },
};

const { width, height } = canvs;
const rowCounts = 20;
const colCounts = 20;
const rowSpan = height / (rowCounts - 1);
const colSpan = width / (colCounts - 1);

cav.addEventListener('click', (e) => {
  const { x, y } = normalizeCoordinate(cav, e);
  const r = rowSpan / 4;
  console.log(x % Math.floor(rowSpan));
  console.log(y % Math.floor(rowSpan));

  if (x % Math.floor(rowSpan) > r || y % Math.floor(rowSpan) > r) return;

  ctx.beginPath();
  ctx.fillStyle = ChessColorTuple[store.lastStep.colorIndex];

  const normX = Math.round(x / rowSpan) * rowSpan;
  const normY = Math.round(y / rowSpan) * rowSpan;

  ctx.arc(normX, normY, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
});

function grid() {
  const rows = Array.from({ length: rowCounts }, (_, index) => index * rowSpan);
  const cols = Array.from({ length: colCounts }, (_, index) => index * colSpan);

  ctx.beginPath();
  rows.forEach((endXY) => {
    const chessPoint = [];
    endXY = Math.max(endXY, 1);
    endXY = Math.min(endXY, height - 1);
    ctx.moveTo(0, endXY);
    ctx.lineTo(width, endXY);
    endXY = Math.max(endXY, 1);
    endXY = Math.min(endXY, width - 1);
    ctx.moveTo(endXY, 0);
    ctx.lineTo(endXY, height);
  });
  ctx.stroke();
  ctx.closePath();
}

grid();
