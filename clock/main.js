import { drawGrid, isObject,showHoverPosition } from '../utils.mjs'
/**
 * @type { HTMLCanvasElement }
 */
const ele = document.getElementById('canvas')

const canvasWidth = document.body.clientWidth
const canvasHeight = document.body.clientHeight

ele.width = canvasWidth
ele.height = canvasHeight

ele.style.cssText = `
width:${canvasWidth - 2}px;
height:${canvasHeight - 2}px;
margin:auto;
`

function angleToRad(x) {
  return (Math.PI / 180) * x
}

const ctx = ele.getContext('2d')

const scale = window.devicePixelRatio + 1

ctx.scale(scale, scale)



function transformValue(x) {
  return Math.floor(x / scale)
}

const clockIndexList = Array.from({ length: 12 }, (_, idx) => idx)
const originX = transformValue(Math.floor(canvasWidth / 2))
const originY = transformValue(Math.floor(canvasHeight / 2))
const r = 50

/**
 * @param { CanvasRenderingContext2D } ctx
 */
function drawDialPlate() {
  ctx.save()
  ctx.beginPath()
  ctx.arc(originX, originY, r, 0, 2 * Math.PI, true)
  ctx.stroke()
  ctx.closePath()


  ctx.beginPath()
  ctx.arc(originX, originY, 1, 0, 2 * Math.PI)
  ctx.fillStyle = 'black'
  ctx.fill()
  ctx.stroke()
  ctx.closePath()

  const dialIndexFontHeight = 12
  ctx.lineWidth = 0.5
  ctx.font = 'normal 6px Verdana'

  clockIndexList.forEach((index) => {
    const angle = angleToRad(index * 30 - 60)
    const xLen = Math.cos(angle) * r
    const yLen = Math.sin(angle) * r
    const nextX = xLen + originX + 0.5
    const nextY = yLen + originY

    const pointerX = xLen * 0.95 + originX + 0.5
    const pointerY = yLen * 0.95 + originY

    const numberX = xLen * 0.85 + originX
    const numberY = yLen * 0.85 + originY
    ctx.beginPath()
    ctx.moveTo(pointerX, pointerY)
    ctx.lineTo(nextX, nextY)
    const number = index + 1
    const { width } = ctx.measureText(number)
    const shim = Math.round(width / 2)
    ctx.fillText(index + 1, numberX - shim, numberY + shim)
    ctx.stroke()
    ctx.closePath()
  })

  ctx.restore()
}

drawDialPlate()

const HandStrategy = {
  second() {
    const value = new Date().getSeconds()
    const lengthRatio = 0.6
    const step = 360 / 60
    return {
      value,
      lengthRatio,
      step,
    }
  },
  minute() {
    const value = new Date().getSeconds()
    const lengthRatio = 0.6
    const step = 360 / 60
    return {
      value,
      lengthRatio,
      step,
    }
  },
  hour() {
    const value = new Date().getHours() % 12
    const lengthRatio = 0.6
    const step = 360 / 12
    return {
      value,
      lengthRatio,
      step,
    }
  },
}
/**
 * @param {number} value
 * @param {{
 *  step:number,
 *  ratio:number,
 *  rotate:number
 * }} opt
 */
function drawHand(value, { step = 360 / 60, ratio = 0.6, rotate = -90 } = {}) {
  const lengthRatio = ratio
  const angle = angleToRad(value * step)
  const xLen = Math.cos(angle) * r
  const yLen = Math.sin(angle) * r
  const nextX = xLen * lengthRatio + originX
  const nextY = yLen * lengthRatio + originY

  ctx.save()
  ctx.translate(originX, originY)
  ctx.rotate(angleToRad(rotate))
  ctx.beginPath()
  ctx.moveTo(originX - originX, originY - originY)
  ctx.lineTo(nextX - originX, nextY - originY)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

function updateHands(value) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  drawDialPlate(ctx)
  
  const date = new Date()

  drawHand(date.getHours() % 12, { step: 360 / 12, ratio: 0.4 })
  drawHand(date.getMinutes(), { ratio: 0.5 })
  drawHand(date.getSeconds(), { ratio: 0.6 })
  ctx.save()
  ctx.font = 'bold 16px Helvetica'
  ctx.fillText(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,20,20)
  setTimeout(updateHands,1000)
}

updateHands()


