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
  url?: string
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
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

/**
 * @interface Axios 专门用来约束class Axios
 */
export interface Axios {
  // 能分清interface中的函数类型和类类型的方法吗？因为混合类型经常碰到这种问题
  // 这里是类类型的方法,专门用于约束class类的方法
  // 能分清主要看是否命名,命名了就是类类型的方法
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

/**
 * @interface AxiosInstance 本来只是专门约束的一个函数,由于继承了Axios,函数又有了自己的属性方法便扩展成混合类型,这种分开定义再继承方式很好 //https://typescript.bootcss.com/interfaces.html
 */
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise

  (url:String,config?:AxiosRequestConfig):AxiosPromise
}
