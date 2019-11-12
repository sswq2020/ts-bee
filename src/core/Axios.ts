import { AxiosRequestConfig, AxiosPromise,AxiosResponse, Axios,ResolvedFn,RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

/**
 * @interface Axios.interceptors的约束接口,包含一个request,和response的属性，类型都是InterceptorManager<T>
 *
 */
interface Interceptors{
  request:InterceptorManager<AxiosRequestConfig>
  response:InterceptorManager<AxiosResponse>
}


interface PromiseChain<T>{
  resolved:ResolvedFn<T> | ((config:AxiosRequestConfig)=>AxiosPromise)
  rejected?:RejectedFn
}

export default class Bee implements Axios {
  defaults:AxiosRequestConfig


  // 拦截器属性
  interceptors:Interceptors

  constructor(initConfig:AxiosRequestConfig){
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response:new InterceptorManager<AxiosResponse>()
    }
  }

  // 重载的小技巧，用any代替指定类型
  request(url:any,config?: any): AxiosPromise {
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }

    const chain:PromiseChain<any>[] = [{
      resolved:dispatchRequest,
      rejected:undefined
    }]

    this.interceptors.request.forEach((item)=>{
      chain.unshift(item)
    })

    this.interceptors.response.forEach((item)=>{
      chain.push(item)
    })

    let promise = Promise.resolve(config)
    while(chain.length){
      const {resolved,rejected} = chain.shift()!
      promise = promise.then(resolved,rejected)
    }
    return promise
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'GET', url }))
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'Delete', url }))
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'HEAD', url }))
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'OPTIONS', url }))
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'OPTIONS', url, data }))
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'OPTIONS', url, data }))
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'OPTIONS', url, data }))
  }

}
