import {AxiosRequestConfig} from '../types/index'
import {isPlainObject,deepMerge} from '../helpers/util'
// 创建一个干净的对象
const strats = Object.create(null)

/**
 * @description 默认的合并策略,优先取后面一个,没有才取前一个
 */
function defaultStrat(val1:any,val2:any):any{
  return typeof val2 !== 'undefined' ? val2 :val1 // https://www.jianshu.com/p/8107d25f54ac
}

/**
 * @description 只取后面一个合并策略
 */
function fromVal2Strat(val1:any,val2:any):any{
  if(typeof val2 !== 'undefined') {
    return val2
  }
}

/**
 * @description 深度合并策略
 */
function deepMergeStrat(val1:any,val2:any):any{
  if(isPlainObject(val2)){
    return deepMerge(val1,val2)
  }else if(typeof val2 !== 'undefined'){
    return val2
  }else if(isPlainObject(val1)){
    return deepMerge(val1)
  }else if(typeof val1 !== 'undefined'){
    return val1
  }
}



const stratKeysFromVal2 = ['url','params','data']
stratKeysFromVal2.forEach(key=>{
  strats[key] = fromVal2Strat;
})

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key=>{
  strats[key] = deepMergeStrat;
})



export default function mergeConfig(config1:AxiosRequestConfig,config2?:AxiosRequestConfig){
  if(!config2){
    config2 = {}
  }
  // 创建一个干净的对象
  const config = Object.create(null)

  for(let key in config2){
      mergeField(key)
  }

  for(let key in config1){
    if(!config2[key]){
      mergeField(key)
    }
  }

  function mergeField(key:string):void{
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key],config2![key])

  }

  return config
}
