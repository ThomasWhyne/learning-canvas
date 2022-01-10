/**
 * @param { HTMLElement } target
 * @param { MouseEvent } event
 */
let cache = {}
export function normalizeCoordinate(target, event) {
  if (!cache.target || cache.target !== target) {
    cache = target.getBoundingClientRect()
    cache.target = target
  }
  const { left, top, width, height } = cache
  const { clientX, clientY } = event

  return {
    x: clientX - Math.floor(left),
    y: clientY - Math.floor(top),
  }
}
/**
 * @param { CanvasRenderingContext2D } ctx
 * @param {{
 *  step:number,
 *  opacity:number
 * }} opt
 */
export function drawGrid(ctx, { step = 10, opacity = 0.5 } = {}) {
  const { width, height } = ctx.canvas
  ctx.save()
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  ctx.beginPath()
  ctx.lineWidth = 0.5
  ctx.strokeStyle = `rgba(0,0,0,${opacity})`
  for (let i = step + 0.5; i <= width; i += step) {
    ctx.moveTo(i, 0)
    ctx.lineTo(i, height)
  }
  for (let j = 0; j <= height; j += step) {
    ctx.moveTo(0, j)
    ctx.lineTo(width, j)
  }
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

/**
 * @param { CanvasRenderingContext2D } ctx
 */
export function normalizePosition(ctx, x, y) {
  const { left, top } = ctx.canvas.getBoundingClientRect()

  return {
    x: x - left,
    y: y - top,
  }
}

/**
 * @param { CanvasRenderingContext2D } ctx
 */
export function showHoverPosition(ctx) {
  let imageData = null
  ctx.canvas.addEventListener('click', (e) => {
    const { x, y } = normalizePosition(ctx, e.x, e.y)
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  })
  ctx.canvas.addEventListener('mouseenter', () => {
    imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  })

  ctx.canvas.addEventListener('mousemove', (e) => {
    if (imageData) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.putImageData(imageData, 0, 0)
    }

    const { x, y } = normalizePosition(ctx, e.x, e.y)
    ctx.fillText(`(${x},${y})`, x + 5, y - 5)
  })
  ctx.canvas.addEventListener('mouseleave', () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.putImageData(imageData, 0, 0)
  })
}

export function isObject(x) {
  return typeof x === 'object' && !!x
}

export function angleToRad(x) {
  return (Math.PI / 180) * x
}
