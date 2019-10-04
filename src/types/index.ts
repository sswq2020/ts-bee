/****
 * @description 字符串字面量类型允许你指定字符串必须的固定值
 * @param Method 字符串字面量拥有常用的http请求方法
 * */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * @interface 请求参数的配置
 */
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

/**
 * @interface 响应参数的配置
 */
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * @interface 响应值必须是Promise,这样必须继承于interface Promise<T>,其中的T是AxiosResponse
 */
export interface AxiosPromise extends Promise<AxiosResponse> {}

/**
 * @interface 用于处理错误信息
 */
export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code?:string | null
    request?:any
    response?:AxiosResponse
    isAxiosError:boolean
}
