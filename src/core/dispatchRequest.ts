import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

/**
 * @description axios函数的主体,调用xhr函数,实现浏览器ajax功能
 * @param {AxiosRequestConfig} config
 */
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    // Promise.prototype.then---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
    return transformResponseData(res)
  })
}

/**
 * @description 对config每一个配置进行包装处理
 * @param {AxiosRequestConfig} config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data,config.headers,config.transformRequest)
  config.headers = flattenHeaders(config.headers,config.method!)
}

/**
 * @description 调用buildURL函数,对utl进行处理
 * @param {AxiosRequestConfig} config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params,paramsSerialzer } = config
  // 为什么加! 因为AxiosRequestConfig interface里url为可选属性,这里解构config得到的url可能为undefined,类型断言必须有url
  return buildURL(url!, params,paramsSerialzer)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data,res.headers,res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config:AxiosRequestConfig):void{
  if(config.cancelToken){
    config.cancelToken.throwIfRequested()
  }
}




export default dispatchRequest
