import { AxiosRequestConfig } from './types'

function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'get', data = null, headers = {} } = config
  const request = new XMLHttpRequest()
  request.open(method.toLocaleUpperCase(), url, true)
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLocaleLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}

export default xhr
