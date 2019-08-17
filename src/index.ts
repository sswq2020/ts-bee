import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

/**
 * @description axios函数的主体,调用xhr函数,实现浏览器ajax功能
 * @param {AxiosRequestConfig} config
 */
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

/**
 * @description 调用buildURL函数,对utl进行处理
 * @param {AxiosRequestConfig} config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
