import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus

    } = config
    const XHR = new XMLHttpRequest()

    XHR.open(method.toLocaleUpperCase(), url!, true)

    configRequest();
    addEvents();
    processHeaders();
    processCancel();

    XHR.send(data)

    /***
     * 函数内部定义函数,作用域也被限定在函数内,只是为了单纯的封装一下
     * handleResponse
     * ***/
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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

    /***XHR实例添加配置,响应类型,过期时间,withCredentials**/
    function configRequest(): void {
      if (responseType) {
        XHR.responseType = responseType
      }

      if (timeout) {
        XHR.timeout = timeout
      }

      if (withCredentials) {
        XHR.withCredentials = withCredentials
      }
    }
    /***XHR实例添加事件处理函数,最常见的onreadystatechange,onerror,ontimeout,上传下载**/
    function addEvents(): void {

      XHR.onreadystatechange = function () {
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
      }

      XHR.onerror = function handleError() {
        reject(createError('Network Error', config, null, XHR))
      }

      XHR.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', XHR))
      }

      if (onDownloadProgress) {
        XHR.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        XHR.upload.onprogress = onUploadProgress
      }
    }

    /***对请求头进行处理**/
    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // 首先判断如果是配置 withCredentials 为 true 或者是同域请求，我们才会请求 headers 添加 xsrf 相关的字段。
      // 如果判断成功，尝试从 cookie 中读取 xsrf 的 token 值。
      // 如果能读到，则把它添加到请求 headers 的 xsrf 相关字段中。
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrValue = cookie.read(xsrfCookieName)
        if (xsrValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrValue
        }
      }

      if(auth){
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':'+ auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLocaleLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          XHR.setRequestHeader(name, headers[name])
        }
      })
    }

    /***取消请求进行处理**/
    function processCancel(): void {
      if (cancelToken) {
        // tslint:disable-next-line: no-floating-promises
        cancelToken.promise.then(reason => {
          XHR.abort()
          reject(reason)
        })
      }
    }

  })
}

export default xhr
