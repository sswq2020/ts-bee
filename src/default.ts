import {AxiosRequestConfig} from './types'
import { processHeaders } from './helpers/headers'
import { transfromRequest as transferRequest,transfromResponse as  transferResponse} from './helpers/data'
export const defaults:AxiosRequestConfig = {
  method:'get',

  timeout:0,

  headers:{
    common:{
      Accept:'application/json,text/plain,*/*'
    }
  },
  xsrfCookieName:'XSRF-TOKEN',

  xsrfHeaderName:'X-XSRF-TOKEN',

  transformRequest:[function(data,headers){
    processHeaders(headers,data)
    return transferRequest(data)
  }],
  transformResponse:[function(data){
    return transferResponse(data)
  }],

  validateStatus(status){
   return status >= 200 && status <= 300
  }

}

const methodsNoData = ['delete','get','head','options']

methodsNoData.forEach(method=>{
  defaults.headers[method] = {}
})


const methodsWithData = ['post','put','patch']
methodsWithData.forEach(method =>{
  defaults.headers[method] = {
    'Content-Type':'application/x-www-form-urlencoded'
  }
})
