// 首字母大写
export const titleCase = (str) =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;

// 调用原型判断是否为Func
export function isFunc(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
}

// 调用原型判断是否为对象
export function isObj(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
