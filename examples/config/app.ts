import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'
axios.defaults.headers.common['test2'] = 123

// tslint:disable-next-line: no-floating-promises
axios({
  url: "/config/post",
  method: 'post',
  data: { a: 1 },
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})

// tslint:disable-next-line: no-floating-promises
axios({
  transformRequest: [
    function (data) {
      return qs.stringify(data)
    }, ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
      if (typeof data === 'object') {
        data.b = 2
      }
    }
  ],
  url: "/config/post",
  method: 'post',
  data: {
    a:9864234
  }
}).then((res) => {
  console.log(res.data)
})

const instance = axios.create({
   transformRequest:[(function(data){
      return qs.stringify(data)
   }),...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
      if (typeof data === 'object') {
        data.b = 2
      }
    }
  ]
})

// tslint:disable-next-line: no-floating-promises
instance({
  method: 'post',
  url: '/base/post',
  responseType:'json',
  data: {
    a: 11,
    b: 22
  }
}).then((res)=>{
  console.log(res)
})
