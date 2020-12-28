function each(array, iterator) {// 效率： while>for>for in
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iterator(array[index], index);
  }
  return array;
}
function clone(target, map = new WeakMap()) {// weakMap：循环引用
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target)
    }

    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);
    each(keys || target, (value, key) => {
      if (keys) {
        key = value
      }
      cloneTarget[key] = clone(target[key], map)
    })

    return cloneTarget;
  } else {
    return target;
  }
}

let arr = [1, 2, 3];
let obj = {
  a: 1,
  b: 2,
  c: [1, 2, 3]
}
console.log(clone(obj))