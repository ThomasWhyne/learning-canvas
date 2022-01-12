/**
 * @type { HTMLCanvasElement }
*/
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

ctx.beginPath()
ctx.rect(0,0,10,20)
ctx.stroke();

ctx.beginPath();

ctx.rect(0,30,10,20)
ctx.stroke();