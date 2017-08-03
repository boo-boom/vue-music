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
  html.style.fontSize = parseInt(windowWidth / 750 * 20) + 'px';
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

/**
 * 添加style兼容前缀
 * @param style
 * @returns {*}
 */
let elementStyle = document.createElement('div').style;
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  let nameArr = style.split('-');
  let nameStr = vendor;
  nameArr.forEach((item) => {
    nameStr += item.charAt(0).toUpperCase() + item.substr(1);
  });
  return nameStr;
}

/**
 * 随机数组
 * @param arr
 * @returns {[]}
 */
export function shuffle(arr) {
  const _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let t = _arr[i];
    let j = random(0, i);
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 获取指定数组元素索引
 * @param list
 * @param song
 * @returns {number}
 */
export function findIndex(list, song) {
  let _index = 0;
  list.forEach((item, index) => {
    if(item.id === song.id){
      _index = index;
    }
  });
  return _index;
}








