import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})


// tslint:disable-next-line: no-floating-promises
axios({
  method: 'post',
  url: '/base/post',
  responseType:'json',
  data: {
    a: 11,
    b: 22
  }
}).then((res)=>{
  console.log(res)
});

// tslint:disable-next-line: no-floating-promises
(async () => {
 let res =  await axios({
    method: 'post',
    url: '/base/post',
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json,text/plain,*/*'
    },
    data: {
      a: 71,
      b: 62
    }
  })
  console.log(res)
})()


// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data:searchParams
// })



const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
