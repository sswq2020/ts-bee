import {ResolvedFn,RejectedFn,AxiosInterceptorManage} from '../types/index'


interface Interceptor<T> {
  resolved:ResolvedFn<T>,
  rejected?:RejectedFn
}

/**
 * @class InterceptorManager 拦截器管理类
 */
export default class InterceptorManager<T> implements AxiosInterceptorManage<T>{
  /*****数组内部的任意一项为Interceptor<T>或者null,null用于注销****/
  private interceptors:Array<Interceptor<T> | null>;

  use(resolved: ResolvedFn<T>, rejected?:RejectedFn): number {
     this.interceptors.push({
        resolved,
        rejected
     })
     return this.interceptors.length - 1
  }
  eject(id: number): void {
    if(this.interceptors[id]){
      this.interceptors[id] = null
    }
  }

  forEach(fn:(item:Interceptor<T>)=>void):void{
    this.interceptors.forEach(item=>{
      if(item !==null) {
        fn(item)
      }
    })
  };

  constructor(){
    this.interceptors = []
  }
}
