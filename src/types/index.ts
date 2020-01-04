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

  transformRequest?:AxiosTransformer [] | AxiosTransformer,
  transformResponse?:AxiosTransformer [] | AxiosTransformer,

  [propName:string]:any
}

/**
 * @interface 响应参数的配置
 */
export interface AxiosResponse<T = any> { // 其实T就足够了,但是万一不传T，要有一个any
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * @interface 响应值必须是Promise,这样必须继承于interface Promise<T>,其中的T是AxiosResponse<T>,为了避免AxiosPromise<T>中的值不传,所以T=any
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
 * @interface Axios 专门用来约束class Axios,后面叫Bee
 */
export interface Axios {
  defaults:AxiosRequestConfig

  interceptors:{
    request:AxiosInterceptorManage<AxiosRequestConfig>,
    response:AxiosInterceptorManage<AxiosResponse>
  }

  // 能分清interface中的函数类型和类类型的方法吗？因为混合类型经常碰到这种问题
  // 这里是类类型的方法,专门用于约束class类的方法
  // 能分清主要看是否命名,命名了就是类类型的方法
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * @interface AxiosInstance 本来只是专门约束的一个函数,由于继承了Axios,函数又有了自己的属性方法便扩展成混合类型,这种分开定义再继承方式很好 //https://typescript.bootcss.com/interfaces.html
 */
export interface AxiosInstance extends Axios {
  <T =any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T =any>(url:String,config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?:AxiosRequestConfig):AxiosInstance
}

/**
 * @interface AxiosInterceptorManage 拦截器管理类接口
 */
export interface AxiosInterceptorManage<T> {
  /***包含use方法,参数类似Pormise里的resolved和rejected,返回值是拦截器的id,所以是number类型**/
  use(resolved:ResolvedFn<T>,rejected?:RejectedFn):number
  /***包含eject方法,参数是是拦截器的id,所以是number类型**/
  eject(id:number):void
}

/**
 * @interface ResolvedFn泛型接口专门用来约束resolved,返回值类型=>同步T或者异步=>Promise<T>
 */
export interface ResolvedFn<T>{
  (val:T):T|Promise<T>
}
/**
 * @interface RejectedFn泛型接口专门用来约束rejected
 */
export interface RejectedFn{
  (error:any):any
}

/**
 * @interface AxiosTransformer 泛型接口专门用来约束transformRequest,transformResponse
 */
export interface AxiosTransformer  {
  (data:any,headers?:any):any
}
