import { AxiosStatic,AxiosRequestConfig } from './types/index'
import Bee from './core/Axios'
import { extend } from './helpers/util'
import {defaults} from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Bee(config)
  let instance = Bee.prototype.request.bind(context) // 原型方法的的赋值特别要注意this的绑定，不仅仅是这里
  instance = extend(instance, context)
  return instance as AxiosStatic
}
// 在实例化Axios类的时候,我们已经提供一个默认的配置,开发者自定义的配置与default进行合并
const axios = createInstance(defaults)

axios.create = function(config){
  return createInstance(mergeConfig(defaults,config))
}

export default axios
