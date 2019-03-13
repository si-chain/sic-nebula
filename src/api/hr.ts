/*
 * @Author: jhd
 * @Description: HR 管理API file content
 * @Date: 2019-03-13 16:22:29
 */
import ajax from './axios'

// 获取企业商城配置
export function getMpConfigList (params: any): Promise<any> {
  return ajax.get('/broker-outresource/api/company/configure', { params })
}
// 插入一个商城配置
export function addConfigure (params: any): Promise<any> {
  return ajax.post('/broker-outresource/api/company/configure', params)
}
// 修改商城的配置
export function putConfigure (params: any): Promise<any> {
  return ajax.put(`/broker-outresource/api/company/configure/${params.id}`, params.params)
}
// 添加可复用的key的配置
export function addConfigures (params: any): Promise<any> {
  return ajax.post('/broker-outresource/api/company/configure/multi', params)
}
// 修改可复用的key的配置
export function putConfigures (params: any): Promise<any> {
  return ajax.put(`/broker-outresource/api/company/configure/multi/${params.id}`, params.params)
}
// 删除商城配置
export function removeConfigure (params: any): Promise<any> {
  return ajax.delete(`/broker-outresource/api/company/configure/${params}`)
}
