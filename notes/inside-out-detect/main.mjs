import * as alg from './index.mjs'
import * as utils from '../../utils.mjs'

/**
 * @type { HTMLCanvasElement }
 */
const canvas = document.getElementById('canvas')

canvas.style.cssText = 'border:1px solid #eee;'

const ctx = canvas.getContext('2d')

const determine = document.getElementById('determine')
const reset = document.getElementById('reset')
const result = document.getElementById('result')
const random = document.getElementById('random')
const save = document.getElementById('save')
const restore = document.getElementById('restore')
const randomPoint = document.getElementById('randomPoint')

const LOCAL_STORAGE_KEY = '__INSIDE_OUT_DETECT__'
const { width, height } = canvas

/**
 * @type {{
 *  startPoint: import('../../global.js').Point,
 *  endPoint: import('../../global.js').Point,
 *  pathPoint: import('../../global.js').Point
 * }}
 */
const STATE = {
  startPoint: { x: 0, y: 0 },
  endPoint: { x: 0, y: 0 },
  pathPoint: { x: 0, y: 0 },
}

function createReactive(target = {}) {
  const p = new Proxy(target, {
    set() {},
  })
}

const reactiveState = new Proxy(STATE, {
  get() {},
})

/**
 * @typedef {{
 * tagName: keyof HTMLElementTagNameMap,
 * attrs:{
 * type: import('../../global.js').HTMLInputTypes,
 * name: string
 * value: string|number
 * element:null | HTMLElement
 * }
 * }} FieldItem
 */

/**
 * @type { FieldItem }
 */
const fieldPx1 = {
  tagName: 'input',
  attrs: { type: 'number', value: 0, name: 'x1' },
}
/**
 * @type { FieldItem }
 */
const fieldPy1 = {
  tagName: 'input',
  attrs: {
    type: 'number',
    value: 0,
    name: 'y1',
  },
}
/**
 * @type { FieldItem }
 */
const fieldPx2 = {
  tagName: 'input',
  attrs: {
    type: 'number',
    value: 0,
    name: 'x2',
  },
}
/**
 * @type { FieldItem }
 */
const fieldPy2 = {
  tagName: 'input',
  attrs: {
    type: 'number',
    value: 0,
    name: 'y2',
  },
}
/**
 * @type { FieldItem }
 */
const fieldPx = {
  tagName: 'input',
  attrs: {
    type: 'number',
    value: 0,
    name: 'x',
  },
}
/**
 * @type { FieldItem }
 */
const fieldPy = {
  tagName: 'input',
  attrs: {
    type: 'number',
    value: 0,
    name: 'y',
  },
}

/**
 * @type { [FieldItem,FieldItem][] }
 */
const fieldGroups = [
  [fieldPx1, fieldPy1],
  [fieldPx2, fieldPy2],
  [fieldPx, fieldPy],
]

// fieldGroups.forEach((fg) => {
//   fg.forEach((f) => {
//     f.attrs['min'] = 0
//     f.attrs['max'] = f.attrs.name.includes('x') ? width : height
//   })
// })

const form = document.forms[0]
function createForm() {
  const fragment = document.createDocumentFragment()
  fieldGroups.forEach((fg, idx) => {
    const section = document.createElement('section')
    const label = document.createElement('label')
    label.innerHTML = `group-${idx + 1}: `
    section.appendChild(label)
    fg.forEach((f) => {
      const fe = document.createElement(f.tagName)
      Object.keys(f.attrs).forEach((attrKey) => {
        fe.setAttribute(attrKey, f.attrs[attrKey])
      })
      section.appendChild(fe)
      f.element = fe
    })
    fragment.appendChild(section)
  })
  form.appendChild(fragment)
}

createForm()

let startPoint, endPoint, pathPoint

function fillAndDraw(sp, ep, rp) {
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.moveTo(sp.x, sp.y)
  ctx.lineTo(ep.x, ep.y)
  ctx.stroke()
  ctx.closePath()
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.arc(rp.x, rp.y, 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
  fieldPx1.element.value = sp.x
  fieldPy1.element.value = sp.y
  fieldPx2.element.value = ep.x
  fieldPy2.element.value = ep.y
  fieldPx.element.value = rp.x
  fieldPy.element.value = rp.y
}

function getFormData() {
  const formData = {}
  Array.from(form).forEach((field) => {
    formData[field.name] = Number(field.value)
  })
  return formData
}

random.addEventListener('click', () => {
  ;[startPoint, endPoint] = utils.generateRandomPath(width, height)
  pathPoint = utils.getPathRandomPoint(startPoint, endPoint)
  fillAndDraw(startPoint, endPoint, pathPoint)
  determine.dispatchEvent(new Event('click'))
})

randomPoint.addEventListener('click', () => {
  if (startPoint && endPoint) {
    pathPoint = utils.getPathRandomPointNaive(startPoint, endPoint)
    fillAndDraw(startPoint, endPoint, pathPoint)
  }
  determine.dispatchEvent(new Event('click'))
})

determine.addEventListener('click', () => {
  const formData = getFormData()

  startPoint = { x: formData.x1, y: formData.y1 }
  endPoint = { x: formData.x2, y: formData.y2 }
  pathPoint = { x: formData.x, y: formData.y }
  fillAndDraw(startPoint, endPoint, pathPoint)
  const inside = alg.isPointInPath(startPoint, endPoint, pathPoint)
  result.innerHTML = `point: { x:${formData.x}, y:${formData.y} } is ${
    inside ? '' : `<strong style="color:red;">not</strong>`
  } in line`
})

reset.addEventListener('click', () => {
  form.reset()
  result.innerHTML = ''
  ctx.clearRect(0, 0, width, height)
})

save.addEventListener('click', () => {
  const payload = JSON.stringify({
    startPoint,
    endPoint,
    pathPoint,
  })
  localStorage.setItem(LOCAL_STORAGE_KEY, payload)
})

restore.addEventListener('click', () => {
  try {
    let payload = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (payload) {
      payload = JSON.parse(payload)
      console.log(payload)
      fillAndDraw(payload.startPoint, payload.endPoint, payload.pathPoint)
    }
  } catch (error) {
    console.error(error)
  }
})
