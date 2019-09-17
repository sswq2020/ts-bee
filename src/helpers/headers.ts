import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, noramlizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== noramlizedName && name.toLowerCase() === noramlizedName.toLowerCase()) {
      headers[noramlizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parse = Object.create(null)
  if (!headers) {
    return parse
  }
  headers
    .trim()
    .split('\r\n')
    .forEach(line => {
      const keylastIndex = line.indexOf(':')
      let key = line.slice(0, keylastIndex)
      let value = line.slice(keylastIndex + 1)
      key = key.trim().toLowerCase()
      value = value.trim()
      parse[key] = value
    })

  return parse
}
