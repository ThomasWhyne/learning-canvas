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

/**
 * @param { [number, number] } range
 * @param {{
 *  fix: number
 * }} opt
 */
export function getRandomNumber(range = [0, 100], opt = {}) {
  let normOpt = opt
  if (!isObject(normOpt)) normOpt = {}
  if (typeof opt === 'number') normOpt.fix = opt
  if (typeof normOpt.fix !== 'number') normOpt.fix = 0

  const start = Math.min.apply(Math, range)
  const end = Math.max.apply(Math, range)

  return Number((Math.random() * (end - start)).toFixed(normOpt.fix)) + start
}

/**
 * @param { number } width
 * @param { number } height
 * @returns {[import("./global").Point,import("./global").Point]}
 */
export function generateRandomPath(width, height) {
  const p1 = {
    x: getRandomNumber([0, width]),
    y: getRandomNumber([0, height]),
  }

  const p2 = {
    x: getRandomNumber([0, width]),
    y: getRandomNumber([0, height]),
  }

  return [p1, p2]
}

/**
 * @param {import("./global").Point} p1
 * @param {import("./global").Point} y1
 * @param {import("./global").Point} p2
 * @param {import("./global").Point} y2
 */
export function getPathRandomPointNaive(p1, p2) {
  if (p1.x === p2.x)
    return {
      x: p1.x,
      y: getRandomNumber([p1.y, p2.y]),
    }
  if (p1.y === p2.y)
    return {
      x: getRandomNumber([p1.x, p2.x]),
      y: p1.y,
    }
  const x = getRandomNumber([p1.x, p2.x])
  const k = (p2.y - p1.y) / (p2.x - p1.x)
  const y = k * (x - p1.x) + p1.y

  return {
    x,
    y,
  }
}

/**
 * @param { import("./global").Point } p1
 * @param { import("./global").Point } p2
 * @param { number } step
 */
export function getPathRandomPoint(p1, p2, step = 3) {
  return bezier(getRandomNumber([0, 1], step), p1, p2)
}

/**
 * @param { number } t
 * @param { import("./global").Point } p1
 * @param { import("./global").Point } p2
 */
export function bezier(t, p1, p2) {
  const point = {
    x: t * (p2.x - p1.x) + p1.x,
    y: t * (p2.y - p1.y) + p1.y,
  }
  return point
}
