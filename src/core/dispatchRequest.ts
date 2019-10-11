import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transfromRequest, transfromResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

/**
 * @description axios函数的主体,调用xhr函数,实现浏览器ajax功能
 * @param {AxiosRequestConfig} config
 */
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
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
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * @description 调用buildURL函数,对utl进行处理
 * @param {AxiosRequestConfig} config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 为什么加! 因为AxiosRequestConfig interface里url为可选属性,这里解构config得到的url可能为undefined,类型断言必须有url
  return buildURL(url!, params)
}

/**
 * @description 调用buildURL函数,对data进行处理
 * @param {AxiosRequestConfig} config
 */

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transfromRequest(data)
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfromResponse(res.data)
  return res
}

export default dispatchRequest
