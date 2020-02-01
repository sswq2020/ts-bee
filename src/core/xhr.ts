import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers = {}, responseType, timeout, cancelToken } = config
    const XHR = new XMLHttpRequest()

    if (responseType) {
      XHR.responseType = responseType
    }

    if (timeout) {
      XHR.timeout = timeout
    }

    XHR.open(method.toLocaleUpperCase(), url!, true)
    XHR.onreadystatechange = function() {
      // 查阅MDN文档 https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange
      if (XHR.readyState !== 4) {
        return
      }

      if (XHR.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(XHR.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? XHR.response : XHR.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: XHR.status,
        statusText: XHR.statusText,
        headers: responseHeaders,
        config,
        request: XHR
      }
      handleResponse(response)
      // 如果不理解封装,可以用下面注释的代码,这样理解更容易
      // if(response.status >=200 && response.status <= 300){
      //   resolve(response);
      // }else{
      //   reject(new Error(`Request failed with statuscode ${response.status}`))
      // }
    }

    XHR.onerror = function handleError() {
      reject(createError('Network Error', config, null, XHR))
    }

    XHR.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', XHR))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        XHR.setRequestHeader(name, headers[name])
      }
    })

    if(cancelToken) {
      // tslint:disable-next-line: no-floating-promises
      cancelToken.promise.then(reason=>{
        XHR.abort()
        reject(reason)
      })
    }

    XHR.send(data)
    /***
     * 函数内部定义函数,作用域也被限定在函数内,只是为了单纯的封装一下
     * handleResponse
     * ***/
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with statuscode ${response.status}`,
            config,
            null,
            XHR,
            response
          )
        )
      }
    }
  })
}

export default xhr
