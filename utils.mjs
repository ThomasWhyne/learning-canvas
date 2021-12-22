/**
 * @param { HTMLElement } target
 * @param { MouseEvent } event
 */
let cache = {};
export function normalizeCoordinate(target, event) {
  if (!cache.target || cache.target !== target) {
    cache = target.getBoundingClientRect();
    cache.target = target;
  }
  const { left, top, width, height } = cache;
  const { clientX, clientY } = event;

  return {
    x: clientX - Math.floor(left),
    y: clientY - Math.floor(top),
  };
}
