import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transfromRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

/**
 * @description axios函数的主体,调用xhr函数,实现浏览器ajax功能
 * @param {AxiosRequestConfig} config
 */
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
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
  return buildURL(url, params)
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

export default axios
