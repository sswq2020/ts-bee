import { AxiosStatic,AxiosRequestConfig,AxiosClassStatic } from './types/index'
import Bee from './core/Axios'
import { extend } from './helpers/util'
import {defaults} from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, {isCancel} from './cancel/Cancel'


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

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function(promises){
  return Promise.all(promises)
}

axios.spread = function(callback){
  return function wrap(arr){
    return callback.apply(null,arr)
  }
}

axios.Axios = Bee


export default axios
