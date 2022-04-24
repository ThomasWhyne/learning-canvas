/**
 * @param { keyof HTMLElementTagNameMap } type
 * @param { import("../global").ReactiveElement['attributes'] } attributes
 * @param { import("../global").ReactiveElement['children'] } children
 * @returns {import("../global").ReactiveElement }
 */
export function createElement(type, attributes = {}, children) {
 
  const reactiveEle = {
    type,
    attributes,
    children,
    action: 'CREATE',
    instance: null,
    priority: null,
    parent: null,
    sibling: null,
  }

  return reactiveEle
}
