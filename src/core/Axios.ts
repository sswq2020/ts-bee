import { AxiosRequestConfig, AxiosPromise, Axios } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Bee implements Axios {
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
    return dispatchRequest(config)
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
