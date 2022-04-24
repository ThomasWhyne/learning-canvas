/**
 * @typedef { import("../../global").Point } Point
 */

/**
 * @param {Point} point
 */
function toAbs(point) {
  return {
    x: Math.abs(point.x),
    y: Math.abs(point.y),
  }
}

const PRECISION_RADIX = 5

/**
 * @param { Point } startPoint
 * @param { Point } endPoint
 * @param  { Point } point
 * @param {{
 *  precision: number
 * }} opt
 */
export function isPointInPath(startPoint, endPoint, point, opt = {}) {
  const p1 = toAbs(startPoint)
  const p2 = toAbs(endPoint)
  const p = toAbs(point)
  if (p2.x < p1.x) return isPointInPath(p2, p1, p)

  if (
    p.x < p1.x ||
    p.x > p2.x ||
    p.y < Math.min(p1.y, p2.y) ||
    p.y > Math.max(p1.y, p2.y)
  )
    return false
  const normOpt =
    typeof opt === 'number'
      ? {
          precision: opt,
        }
      : opt || {}

  if (typeof normOpt.precision !== 'number') normOpt.precision = PRECISION_RADIX
  const k1 = p2.x - p1.x === 0 ? 0 : (p2.y - p1.y) / (p2.x - p1.x)
  const k2 = p.x - p1.x === 0 ? 0 : (p.y - p1.y) / (p.x - p1.x)

  const radix = Math.pow(10, normOpt.precision)
  return (k1 * radix).toFixed(0) === (k2 * radix).toFixed(0)
}
