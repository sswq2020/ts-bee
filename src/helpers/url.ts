import { isDate, isPlainObject,isURLSearchParams } from './util'

interface URLOrigin{
  protocol:string
  host:string
}

interface ParamsSerialzer{
  (params:any):string
}

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
export function buildURL(url: string, params: any,paramsSerialzer?:ParamsSerialzer): string {
  if (!params) {
    return url
  }
  let serimal

  if(paramsSerialzer){
    serimal = paramsSerialzer(params);
  }else if(isURLSearchParams(params)){
    serimal = params.toString()
  }else {
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

    serimal = parts.join('&')
  }

  if (serimal) {
    let marIndex: number = url.indexOf('#')
    if (marIndex > -1) {
      url = url.slice(0, marIndex)
    }
    url = url + (url.indexOf('?') === -1 ? '?' + serimal : '&' + serimal)
  }
  return url
}

/**
 * @function 判断是否是同域
 * @param {string} requestURL 请求地址
 */
export function isURLSameOrigin(requestURL:string):boolean{
   const parseOrigin = resolveURL(requestURL);
   return (parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host)
}

const urlParsingNode = document.createElement('a')
/***当前页面的href**/
const currentOrigin = resolveURL(window.location.href)


/**
 * @function 生成一个a标签,看它的href属性,解构其protocol,host
 * @param {string} requestURL 请求地址
 */
function resolveURL(url:string):URLOrigin{
  urlParsingNode.setAttribute('href',url);
  const {protocol,host} = urlParsingNode
  return {
    protocol,
    host
  }

}
