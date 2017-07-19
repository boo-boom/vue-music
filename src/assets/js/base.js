/**
 * 初始化rem
 * @constructor
 */
export function DOMLoaded() {
  document.addEventListener('DOMContentLoaded', () => {
    computedREM();
  })
}

/**
 * 计算rem
 */
export function computedREM() {
  const html = document.documentElement;
  const windowWidth = html.clientWidth;
  html.style.fontSize = parseInt(windowWidth / 75 * 2) + 'px';
}

/**
 * 判断是否存在class
 * @param el
 * @param cls
 */
export function addClass(el, cls) {
  if (hasClass(el, cls)) {
    return
  }
  let newClass = el.className.split(' ');
  newClass.push(cls);
  el.className = newClass.join(' ');
}

/**
 * 判断是否存在class
 * @param el
 * @param cls
 * @returns {boolean}
 */
export function hasClass(el, cls) {
  let reg = new RegExp('(^|\\s)' + cls + '(\\s|$)');
  return reg.test(el.className);
}

/**
 * 获取/设置dom属性
 * @param el
 * @param name
 * @param val   属性存在时为set
 * @returns {string}
 */
export function getData(el, name, val) {
  if (val) {
    el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
}
