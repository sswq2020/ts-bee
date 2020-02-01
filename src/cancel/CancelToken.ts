import { CancelToken as thisCancelToken, CancelExecutor, CancelTokenSource, Canceler } from '../types/index'

/****这里Cancel为什么不通过types/index   interface Cancel获取接口类型定义
 * 为什么非要通过class Cancel来定义,因为class Cancel既可以当作类型也可以当作值
 * ****/
import  Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken implements thisCancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(){
    if(this.reason) {
      throw this.reason;
    }
  }

  constructor(fn: CancelExecutor) {

    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    // 假如把fn里面的函数分拆开来
    // let that = this
    // function _cancel_ (message?:string){
    //   if(that.reason){
    //     return
    //   }
    //   that.reason = new Cancel(message)
    //   resolvePromise(that.reason)
    // }

    // 这一段最容易误解的一段就是以为在构造函数实例化执行fn函数,会调用resolvePromise(),Promise从pending状态变了
    // 这是最大的错误,fn里面的不过是参数，参数正好是函数
    // 如果把里面的函数分拆开来就是
    // fn(_cancel_)

    fn(message => {
      if(this.reason){
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })

  }

  static source():CancelTokenSource{
    let cancel!:Canceler
    const token = new CancelToken(c=>{
      cancel = c
    })
    return {
      cancel,
      token
    }
  }

}


// let cancel = null;
// function executor(e){
//     cancel = e
// }

// executor( message =>{
//     console.log(message)
// });

// console.log(cancel)
