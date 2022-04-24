import { createHooks } from './hooks.mjs'
let cache = null
let renderCount = 0

/**
 * @param { import("../global").ReactiveElement  } element
 */
function updateInstance(element) {
  Object.keys(element.attributes).forEach((attrKey) => {
    if (element.attributes[attrKey] !== element.prev.attributes[attrKey]) {
      e.setAttribute(attrKey, element.attributes[attrKey])
    }
  })
}
function deleteInstance() {}
function replaceInstance() {}

/**
 * @param { import("../global").ReactiveElement  } element
 */
function createInstance(element) {
  const e = document.createElement(element.type)
  Object.keys(element.attributes).forEach((attrKey) => {
    e.setAttribute(attrKey, element.attributes[attrKey])
  })
  element.instance = e

  element.children.forEach((child) => {
    render(child, e)
  })
  return element
}

/**
 * @param {import("../global").ReactiveElement } element
 * @param { HTMLElement } target
 */
export function render(element, target) {
  switch (root.action) {
    case 'CREATE':
      target.innerHTML = ''
      const instance = createInstance(element)
      instance.parent = target
      instance.prev = null
      target.appendChild(instance.instance)
      break
    case 'UPDATE':
      updateInstance(element)
      break
    case 'DELETE':
    case 'REPLACE':
  }
}

