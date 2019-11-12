import { AxiosInstance,AxiosRequestConfig } from './types/index'
import Bee from './core/Axios'
import { extend } from './helpers/util'
import {defaults} from './default'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Bee(config)
  let instance = Bee.prototype.request.bind(context) // 原型方法的的赋值特别要注意this的绑定，不仅仅是这里
  instance = extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
