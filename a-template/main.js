import { createAxis, showHoverPosition } from '../utils.mjs'
/**
 * @type { HTMLCanvasElement }
*/
const cav = document.getElementById('canvs')
const ctx = cav.getContext('2d')

createAxis(ctx)
showHoverPosition(ctx)