import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios('/extend/post',{
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post', { msg: 'post' })
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })

/*************测试响应数据泛型支持****************/


interface Response<T = any> {
  code:number,
  result:T
  message:string
}

interface User {
  name:string,
  age:number
}

function getUser<T>(){
  return axios<Response<T>>('/extend/user').then((res)=>{
    return res.data
  }).catch((err)=>{
    console.log(err)
  })
}

async function test(){
  const user = await getUser<User>()
  if(user){
    console.log(user.result.name)
  }
}


test();
