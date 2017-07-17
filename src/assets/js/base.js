//计算rem
export function DOMLoaded() {
    document.addEventListener('DOMContentLoaded', () => {
        computedREM();
    })
}

export function computedREM() {
    const html = document.documentElement;
    const windowWidth = html.clientWidth;
    html.style.fontSize = parseInt(windowWidth / 75 * 2) + 'px';
}

//添加class
export function addClass(el, cls) {
    if (hasClass(el, cls)) {
        return
    }
    let newClass = el.className.split(' ');
    newClass.push(cls);
    el.className = newClass.join(' ');
}

//判断是否存在class
export function hasClass(el, cls) {
    let reg = new RegExp('(^|\\s)' + cls + '(\\s|$)');
    return reg.test(el.className);
}
