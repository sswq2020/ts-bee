import { isPlainObject } from '../helpers/util'

export function transfromRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}
