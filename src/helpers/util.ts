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

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * @description 这里只实现普通对象的深度拷贝,Lodash考虑得到太复杂,所以自己实现更方便一些
 */
export function deepMerge(...objs:any[]):any{
  const result = Object.create(null)
  objs.forEach(obj=>{
    if(obj){
      Object.keys(obj).forEach(key=>{
        const val = obj[key]
        if(isPlainObject(val)){
          if(isPlainObject(result[key])){
            result[key] = deepMerge(result[key],val)
          }else{
            result[key] = deepMerge(val)
          }
        }else{
          result[key] = val
        }

      })
    }
  })
  return result
}
