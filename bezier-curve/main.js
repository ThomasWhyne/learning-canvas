import { drawGrid, showHoverPosition } from '../utils.mjs'
/**
 * @type { HTMLCanvasElement }
 */
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

function bezier(t, p0, p1) {
  const point = {
    x: t * (p1.x - p0.x) + p0.x,
    y: t * (p1.y - p0.y) + p0.y,
  }
  return point
}

function quadraticBezier(t, p0, p1, p2) {
  const p0p1 = bezier(t, p0, p1)
  const p1p2 = bezier(t, p1, p2)
  return bezier(t, p0p1, p1p2)
}

function cubicBezier(t, p0, p1, p2, p3) {
  const p0p1 = bezier(t, p0, p1)
  const p1p2 = bezier(t, p1, p2)
  const p2p3 = bezier(t, p2, p3)
  return quadraticBezier(t, p0p1, p1p2, p2p3)
}

function drawBackground() {
  drawGrid(ctx)
  // showHoverPosition(ctx)
}

const points = [
  { x: 50, y: 50 },
  { x: 200, y: 200 },
  { x: 250, y: 50 },
  { x: 500, y: 200 },
]

function drawQudraticOne() {
  ctx.save()
  ctx.strokeStyle = 'goldenrod'
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  ctx.bezierCurveTo(
    points[1].x,
    points[1].y,
    points[2].x,
    points[2].y,
    points[3].x,
    points[3].y
  )
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

function drawLine() {
  ctx.lineWidth = 2
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  ctx.lineTo(points[1].x, points[1].y)
  ctx.lineTo(points[2].x, points[2].y)
  ctx.lineTo(points[3].x, points[3].y)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}
let t = 0
function drawAnimatedPoints() {
  if (t > 1) t = 0
  ctx.clearRect(0, 0, cav.width, cav.height)
  init()
  ctx.save()
  const p = cubicBezier(t, points[0], points[1], points[2], points[3])
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'red'
  ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
  // ctx.fillText(`(${p.x},${p.y})`,p.x + 10, p.y + 10)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  t += 0.01
  t = parseFloat(t.toFixed(2))
  requestAnimationFrame(drawAnimatedPoints)
  // setTimeout(drawAnimatedPoints,2000)
}

function init() {
  drawBackground()
  drawLine()
  drawQudraticOne()
}

init()

drawAnimatedPoints()
