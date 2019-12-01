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
// 在实例化Axios类的时候,我们已经提供一个默认的配置,开发者自定义的配置与default进行合并
const axios = createInstance(defaults)

export default axios
