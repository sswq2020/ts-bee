import {
  isDate, isFormData, isPlainObject, isURLSearchParams, extend, deepMerge
} from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy() // 断言含义请看https://www.cnblogs.com/Wolfmanlq/p/8018370.html
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy() // 断言含义请看https://www.cnblogs.com/Wolfmanlq/p/8018370.html
      expect(isPlainObject(new Date())).toBeFalsy()
      expect(isPlainObject({ a: 1 })).toBeTruthy()
      expect(isPlainObject({ a: [1, 3, 4] })).toBeTruthy()
    })

    test('should validate FormData', () => {
      expect(isFormData({})).toBeFalsy() // 断言含义请看https://www.cnblogs.com/Wolfmanlq/p/8018370.html
      expect(isFormData(new FormData())).toBeTruthy()
    })

    test('should validate isURLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy() // 断言含义请看https://www.cnblogs.com/Wolfmanlq/p/8018370.html
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })




  })





})
