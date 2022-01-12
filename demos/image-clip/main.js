/**
 * @type { HTMLCanvasElement }
 */

const canvs = document.getElementById('canvas')

const ctx = canvs.getContext('2d')

const resetBtn = document.getElementById('resetBtn')

const rubberBandDiv = document.getElementById('selector')

const img = new Image()

const mouseDown = {}
const rubberBandRect = {}
let dragging = false

function moveRubberBand() {
    rubberBandDiv.style.cssText = `top:${rubberBandRect.top}px;left:${rubberBandRect.left}px;`
}

function resizeRubberBand() {
    rubberBandDiv.style.cssText = `width:${rubberBandRect.width}px;height:${rubberBandRect.height}px;`
}

function showRubberBand() {
    rubberBandDiv.style.display = 'inline'
}

function hideRubberBand() {
    rubberBandDiv.style.display = 'none'
}

function resetRubberBand() {
    rubberBandRect = { top: 0, left: 0, width: 0, height: 0 }
}

function rubberBandStart(x, y) {
    rubberBandRect.left = mouseDown.x = x
    rubberBandRect.top = mouseDown.y = y
    moveRubberBand()
    showRubberBand()
    dragging = true
}

function rubberBandStrech(x, y) {
    rubberBandRect.left = x < mouseDown.x ? x : mouseDown.x
    rubberBandRect.top = y < mouseDown.y ? y : mouseDown.y
    rubberBandRect.width = Math.abs(x - mouseDown.x)
    rubberBandRect.height = Math.abs(y - mouseDown.y)
    moveRubberBand()
    resizeRubberBand()
}

function rubberBandEnd() {
    const canvasRect = canvs.getBoundingClientRect()
    try {
        ctx.drawImage(
            canvs,
            rubberBandRect.left - canvasRect.left,
            rubberBandRect.top - canvasRect.top,
            rubberBandRect.width,
            rubberBandRect.height,
            0,
            0,
            canvs.width,
            canvs.height
        )
    } catch (error) {}

    resizeRubberBand();
    rubberBandDiv.style.cssText = `width:0;height:0;`
    hideRubberBand();
    dragging = false
}

canvs.width = canvs.parentElement.clientWidth / 2
canvs.height = canvs.parentElement.clientHeight / 2
canvs.style.cssText = 'border: 1px solid red;'

resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvs.width, canvs.height)
})

canvs.onmousedown = function (e) {
    const { clientX, clientY } = e
    e.preventDefault()
    rubberBandStart(clientX, clientY)
}

window.addEventListener('mousemove', function (e) {
    const { clientX, clientY } = e
    e.preventDefault()
    if (dragging) {
        rubberBandStrech(clientX, clientY)
    }
})

window.addEventListener('mouseup', function (e) {
    e.preventDefault()
    rubberBandEnd()
})

img.onload = function () {
    // ctx.drawImage(img, 0, 0, canvs.width, canvs.height)
    ctx.font = '38px Arial'
    ctx.strokeText('口',50,50)
}

img.src =
    'https://cn.bing.com/th?id=OHR.SiberianSunset_ZH-CN5711093662_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'
