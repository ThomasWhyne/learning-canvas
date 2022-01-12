import { drawGrid, showHoverPosition } from '../../utils.mjs'
/**
 * @type { HTMLCanvasElement }
 */
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')
ctx.fillStyle = 'grey'
ctx.fillRect(58,58,10,10)

drawGrid(ctx)
showHoverPosition(ctx)

function createArc(cx, cy, x2, y2, r) {
  return {
    cx,
    cy,
    x2,
    y2,
    r,
  }
}

function roundCornerRect(x, y, width, height, r) {
  const rect = {
    width: width - r,
    height: height - r,
  }

  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.moveTo(x+r, y)
  ctx.lineTo(x + rect.width, y)

  const cx1 = x + width
  const cy1 = y
  const x11 = cx1
  const y11 = y + r
  const arc_1 = createArc(cx1, cy1, x11, y11, r)

  const cx2 = arc_1.cx
  const cy2 = y + height
  const x12 = arc_1.cx - r
  const y12 = cy2
  const arc_2 = createArc(cx2, cy2, x12, y12, r)
  
  const cx3 = x;
  const cy3 = arc_2.cy;
  const x13 = x;
  const y13 = y + height - r
  const arc_3 = createArc(cx3,cy3,x13,y13,r)

  

  ctx.arcTo(arc_1.cx, arc_1.cy, arc_1.x2, arc_1.y2, r)

  ctx.moveTo(arc_1.x2, arc_1.y2)
  ctx.lineTo(arc_1.cx, y + rect.height)

  ctx.arcTo(arc_2.cx, arc_2.cy, arc_2.x2, arc_2.y2, r)
  ctx.moveTo(arc_2.x2, arc_2.y2)
  ctx.lineTo(x+r, arc_2.cy)

  ctx.arcTo(arc_3.cx,arc_3.cy,arc_3.x2,arc_3.y2,r)
  ctx.moveTo(arc_3.x2,arc_3.y2)
  ctx.lineTo(x,y+r)

  ctx.arcTo(x,arc_1.cy,x+r,y,r)
  ctx.stroke()
}

roundCornerRect(50, 10, 100, 100, 20)
