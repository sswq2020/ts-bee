import { isDate, isPlainObject } from './util'

/**
 * @author sswq
 * @param {string} val 传入的字符串
 * @function 对特殊的:$,+[]进行encodeURIComponent编码"
 * @returns {string}
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 * @function 处理请求的url和params,形成url?key1=v1&key2=v2的请求方式
 * @param {string} url 请求地址
 * @param {Object} params 任意类型参数
 *
 */
export function buildURL(url: string, params: any): string {
  if (!params) {
    return url
  }

  let parts: Array<String> = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    // 当value不存在是直接跳过
    if (val === null || val === undefined) {
      return
    }

    let values = []
    if (Array.isArray(val)) {
      key = key + '[]'
      values = val
    } else {
      values = [val]
    }

    values.forEach(item => {
      if (isDate(item)) {
        item = item.toISOString()
      } else if (isPlainObject(item)) {
        item = JSON.stringify(item)
      }
      parts.push(`${encode(key)}=${encode(item)}`)
    })
  })

  let serimal = parts.join('&')
  if (serimal) {
    let marIndex: number = url.indexOf('#')
    if (marIndex > -1) {
      url = url.slice(0, marIndex)
    }
    url = url + (url.indexOf('?') === -1 ? '?' + serimal : '&' + serimal)
  }
  return url
}
