import { drawGrid, showHoverPosition, angleToRad } from '../utils.mjs'
/**
 * @type { HTMLCanvasElement }
 */
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

// drawGrid(ctx)
// showHoverPosition(ctx)

function getPolygonPoints(
  centerX,
  centerY,
  radius,
  sides,
  startAngle = 0,
  endAngle = (Math.PI * 2)
) {
  const points = []
  let angle = startAngle,
    x,
    y
   
  sides = sides * (endAngle / (Math.PI * 2))
  
  for (let i = 0; i <= sides; i++) {
    x = Math.cos(angle) * radius + centerX
    y = Math.sin(angle) * radius + centerY
    points.push({ x, y })
    angle += (2 * Math.PI) / sides
  }
  return points
}

function drawPolygon() {
  const points = getPolygonPoints(300, 150, 40, 8,)
  ctx.save()
  let p = points[0]
  ctx.moveTo(p.x, p.y)
  for (let i = 1; i < points.length; i++) {
    p = points[i]
    ctx.lineTo(p.x, p.y)
  }
  ctx.stroke()
  ctx.restore()
}

drawPolygon()


