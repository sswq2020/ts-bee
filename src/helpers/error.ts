import { AxiosRequestConfig, AxiosResponse } from '../types/index'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 这一段特别奇怪，我们知道通过new 关键字获得的实例它的__proto__已经指向父类的原型
    // 但是TS内置的一些Error,Array有毒,所以需要手动
    Object.setPrototypeOf(this, AxiosError.prototype) // => this.__proto__ = AxiosError.prototype
  }
}


export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse) {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
