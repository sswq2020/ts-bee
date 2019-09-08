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
