/****
 * @description 字符串字面量类型允许你指定字符串必须的固定值
 * @param Method 字符串字面量拥有常用的http请求方法
 * */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * @interface 请求参数的配置
 */
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
