/**
 * @type { HTMLCanvasElement }
*/
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

function grid(){
  const { width,height } = canvs
  const rowCounts = 3
  const colCounts = 10;
  const rowSpan = height / (rowCounts - 1)
  const colSpan = width /( colCounts - 1)
  const rows = Array.from({ length:rowCounts },(_,index)=>index * rowSpan)
  const cols = Array.from({ length:colCounts },(_,index)=>index * colSpan)

  ctx.beginPath()
  rows.forEach(endXY=>{
    endXY = Math.max(endXY,1)
    endXY = Math.min(endXY,height-1)
   ctx.moveTo(0,endXY)
   ctx.lineTo(width,endXY)
  })
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath();
  cols.forEach(endXY=>{
    endXY = Math.max(endXY,1)
    endXY = Math.min(endXY,width-1)
    ctx.moveTo(endXY,0)
    ctx.lineTo(endXY,height)
  })

  ctx.stroke()
  ctx.closePath()
}

grid()