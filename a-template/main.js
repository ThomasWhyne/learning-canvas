import { drawGrid, showHoverPosition } from '../utils.mjs'
/**
 * @type { HTMLCanvasElement }
*/
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

drawGrid(ctx)
showHoverPosition(ctx)