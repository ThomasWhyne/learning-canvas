/**
 * @type { HTMLCanvasElement }
*/
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

const edges = Array.from({ length:360 },(_,index)=>index  )
const originX = canvs.width - 41;
const originY = canvs.height/2
const radius = 40;

let nextX = originX + radius;
let nextY = originY

ctx.beginPath()
ctx.arc(41,originY,radius,0,Math.PI*2)
ctx.stroke()

ctx.closePath()

ctx.beginPath()
ctx.moveTo(41,originY)
ctx.lineTo(originX,originY)

ctx.stroke()

ctx.closePath()

ctx.beginPath()
ctx.moveTo(nextX,nextY)


edges.forEach(noEdge=>{
  const angle = Math.PI / 180 * (noEdge)
  console.log(noEdge)
  nextX = originX +  Math.cos(angle) * radius;
  nextY = originY - Math.sin(angle) * radius;

  ctx.lineTo(Math.round(nextX),Math.round(nextY))
  ctx.stroke()
})

