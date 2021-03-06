const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const atob = require('atob')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const multipart = require('connect-multiparty')
const WebpackConfig = require('./webpack.config')
const router = express.Router()

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))


router.get('/simple/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function (req, res) {
  res.json(req.query)
})

router.post('/base/post', function (req, res) {
  let postData = ''
  req.on('data', chunk => {
    postData += chunk.toString()
  })
  req.on('end', () => {
    res.json(JSON.parse(postData))
  })
  // res.json(req.body)

})

router.post('/base/buffer', function (req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', function (req, res) {
  if (Math.random() > 0.01) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function (req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.get('/interceptor/get', (req, res) => {
  res.end("hello")
})

router.get('/more/get', (req, res) => {
  res.json(req.cookies)
})

registerExtendRouter()
registerConfigRouter()
// registerInterceptorRouter()

function registerExtendRouter() {
  router.get('/extend/user', (req, res) => {
    res.json({
      code: 0,
      message: 'success',
      result: {
        name: 'sswq',
        age: 28
      }
    })
  })

  router.get('/extend/get', (req, res) => {
    res.json({
      msg: `hello world`
    })
  })
  router.options('/extend/options', (req, res) => {
    res.end()
  })

  router.delete('/extend/delete', (req, res) => {
    res.end()
  })

  router.head('/extend/head', (req, res) => {
    res.end()
  })

  router.post('/extend/post', (req, res) => {
    res.json(req.body)
  })

  router.put('/extend/put', (req, res) => {
    res.json(req.body)
  })

  router.patch('/extend/patch', (req, res) => {
    res.json(req.body)
  })
}

function registerConfigRouter() {
  router.post('/config/post', (req, res) => {
    res.json(req.body)
  })
}

router.get('/cancel/get', (req, res) => {
  setTimeout(() => {
    res.json('hello')
  }, 1000)
})

router.post('/cancel/post', (req, res) => {
  setTimeout(() => {
    res.json('324234234234')
  }, 1000)
})

router.post('/more/upload', function (req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})


router.post('/more/post', function (req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.end('123123')
  } else {
    res.end('UnAuthorization')
  }
})

router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})

app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))


// function registerInterceptorRouter() {
//   router.get('/interceptor/get',(req,res)=>{
//     res.end("hello")
//   })
// }

app.use(router)
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const port = 1111 || process.env.PORT
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
