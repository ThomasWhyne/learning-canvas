/**
 * @type { HTMLCanvasElement }
 */
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

function rect(x, y, w, h, anitclockwise = false) {
    // ctx.beginPath()
    ctx.moveTo(x, y)
    if (anitclockwise) {
        ctx.lineTo(x, y + h)
        ctx.lineTo(x + w, y + h)
        ctx.lineTo(x + w, y)
    } else {
        ctx.lineTo(x + w, y)
        ctx.lineTo(x + w, y + h)
        ctx.lineTo(x, y + h)
    }

    ctx.closePath()
}

function triangle(x1,y1,x2,y2,x3,y3){
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.lineTo(x3,y3)
  ctx.lineTo(x1,y1)
  ctx.closePath()
}

rect(0,0,canvs.width,canvs.height,true)
rect(10,10,20,20)

triangle(30,50,60,50,60,70)

ctx.fill()
