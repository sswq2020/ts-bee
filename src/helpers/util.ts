const toString = Object.prototype.toString // 常用的判断类型的方法 掘金收藏的类型判断上有 https://juejin.im/post/5c64d15d6fb9a049d37f9c20#heading-28

export function isDate(val: any): val is Date {
  // 类型谓词专门用来指定具体类型,在开发者认为自己比编译器更理解它的类型
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
